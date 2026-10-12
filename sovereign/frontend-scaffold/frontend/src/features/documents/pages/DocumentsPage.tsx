import { FileText, Upload } from "lucide-react";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

const documents = [
  {
    name: "Safety_Manual_2026.pdf",
    type: "PDF",
    size: "4.2 MB",
    status: "Indexed",
  },
  {
    name: "Inspection_Report_A12.pdf",
    type: "PDF",
    size: "2.8 MB",
    status: "Indexed",
  },
  {
    name: "Approval_Note_Template.docx",
    type: "DOCX",
    size: "85 KB",
    status: "Ready",
  },
  {
    name: "Maintenance_Data.xlsx",
    type: "XLSX",
    size: "1.1 MB",
    status: "Indexed",
  },
];

export default function DocumentsPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Documents</h2>
          <p>Manage local organization knowledge</p>
        </div>

        <Button>
          <Upload size={18} />
          Upload document
        </Button>
      </div>

      <Card title="Local knowledge base">
        <div className="document-table">
          <div className="table-header">
            <span>Document</span>
            <span>Type</span>
            <span>Size</span>
            <span>Status</span>
          </div>

          {documents.map((document) => (
            <div className="table-row" key={document.name}>
              <div className="document-name">
                <FileText size={18} />
                <span>{document.name}</span>
              </div>
              <span>{document.type}</span>
              <span>{document.size}</span>
              <Badge color="green">{document.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}