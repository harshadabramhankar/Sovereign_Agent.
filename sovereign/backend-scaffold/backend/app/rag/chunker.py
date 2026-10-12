def chunk_text(text: str) -> list[str]:
    return [text[i:i + 500] for i in range(0, len(text), 500)]