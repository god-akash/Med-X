// send req to backend for url 
export async function requestUpload({
  fileName,
  fileType,
  fileSize,
}) {
  const response = await fetch(
    "/api/models/upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        fileType,
        fileSize,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to prepare upload"
    );
  }

  return data;
}

// uplaod the file to object storage via url API

export async function uploadFileDirectly({
  uploadUrl,
  file,
  contentType,
  onProgress,
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl);

    xhr.setRequestHeader(
      "Content-Type",
      contentType ||
        "application/octet-stream"
    );

    xhr.upload.addEventListener(
      "progress",
      (event) => {
        if (!event.lengthComputable) return;

        const percent = Math.round(
          (event.loaded / event.total) * 100
        );

        onProgress?.(percent);
      }
    );

    xhr.onload = () => {
      if (
        xhr.status >= 200 &&
        xhr.status < 300
      ) {
        resolve();
      } else {
        reject(
          new Error(
            `Upload failed: ${xhr.status}`
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(
        new Error("Network error during upload")
      );
    };

    xhr.onabort = () => {
      reject(
        new Error("Upload cancelled")
      );
    };

    xhr.send(file);
  });
}