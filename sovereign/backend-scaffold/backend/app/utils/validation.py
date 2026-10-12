ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".docx", ".xlsx"}


def is_valid_extension(filename: str) -> bool:
    return "." in filename and filename.lower().rsplit(".", 1)[1] in {
        ext.replace(".", "") for ext in ALLOWED_EXTENSIONS
    }