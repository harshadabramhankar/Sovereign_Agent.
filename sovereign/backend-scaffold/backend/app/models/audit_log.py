from sqlalchemy import Column, DateTime, String

from app.db.base import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True)
    user = Column(String, nullable=False)
    action = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)
