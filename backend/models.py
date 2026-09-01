import uuid

from sqlalchemy import Column, String, DateTime, BigInteger
from sqlalchemy.sql import func

from database import Base


class Model(Base):
    __tablename__ = "models"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    filename = Column(
        String,
        nullable=False
    )

    storage_key = Column(
        String,
        nullable=False,
        unique=True
    )

    file_size = Column(
        BigInteger,
        nullable=True
    )

    file_type = Column(
        String,
        nullable=True
    )

    scan_status = Column(
        String,
        nullable=False,
        default="pending"
    )

    risk_score = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )