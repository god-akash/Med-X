import uuid

from fastapi import FastAPI, UploadFile, File

from database import SessionLocal
from models import Model
from storage import upload_file


app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "AI Model Scanner API is running"
    }


@app.post("/models/upload")
async def upload_model(file: UploadFile = File(...)):

    # Generate unique ID for this model
    model_id = str(uuid.uuid4())

    # Create unique storage path
    object_name = f"models/{model_id}/{file.filename}"

    # Upload actual model to MinIO
    upload_file(
        file.file,
        object_name
    )

    # Get database session
    db = SessionLocal()

    try:
        # Create metadata record
        model = Model(
            id=model_id,
            filename=file.filename,
            storage_key=object_name,
            file_type=file.content_type,
            scan_status="pending"
        )

        # Save metadata to Neon
        db.add(model)
        db.commit()
        db.refresh(model)

        return {
            "message": "Model uploaded successfully",
            "model_id": model.id,
            "filename": model.filename,
            "storage_key": model.storage_key,
            "scan_status": model.scan_status
        }

    finally:
        db.close()