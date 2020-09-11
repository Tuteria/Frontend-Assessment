from data_layer.models.base import Base
import sqlalchemy as sql
from datetime import datetime

class Note(Base):
    __tablename__ = "note"
    id = sql.Column(sql.Integer, primary_key=True)
    title = sql.Column(sql.String)
    body = sql.Column(sql.Text)
    username = sql.Column(sql.Text)
    category = sql.Column(sql.Text)
    created_at = sql.Column(sql.DateTime, default=datetime.now)
    updated_at = sql.Column(sql.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<Note (id={self.id}, title={self.title})>"