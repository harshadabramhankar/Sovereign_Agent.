from sqlalchemy import Boolean, Column, String

from app.db.base import Base


class KnowledgeSource(Base):
    __tablename__ = "knowledge_sources"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    indexed = Column(Boolean, default=False)
