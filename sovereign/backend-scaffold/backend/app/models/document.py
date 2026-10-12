from sqlalchemy import Column, String

from app.db.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    doc_type = Column(String, nullable=False)
