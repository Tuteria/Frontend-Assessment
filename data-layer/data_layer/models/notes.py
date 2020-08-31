from data_layer.models.base import Base
from sqlalchemy.orm import relationship
import sqlalchemy as sql


class Notes(Base):
    __tablename__ = "notes"
    id = sql.Column(sql.Integer, primary_key=True)
    title = sql.Column(sql.String)
    description = sql.Column(sql.Text)
    author_id = sql.Column(sql.Integer)
    # author-id = sql.Column(sql.Integer)
    
    def __repr__(self):
        return f"<Note (id={self.id}, title={self.title})>"

