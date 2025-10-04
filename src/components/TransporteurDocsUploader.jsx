import { useState, useEffect } from "react";
import {
  uploadTransporteurDoc,
  listUserDocs,
  getFileUrl,
} from "../services/storage";

export default function TransporteurDocsUploader() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const docs = await listUserDocs();
        setFiles(docs);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchDocs();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const path = await uploadTransporteurDoc(file);
      setFiles((prev) => [...prev, { name: file.name }]);
      console.log("Uploaded:", path);
    } catch (err) {
      console.error("Upload error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="font-semibold mb-2">Upload your documents</h2>

      <input type="file" onChange={handleUpload} disabled={loading} />
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}

      <ul className="mt-4 space-y-2">
        {files.map((f, i) => (
          <li key={i}>
            <a
              href={getFileUrl(`${files.user_id}/${f.name}`)}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {f.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
