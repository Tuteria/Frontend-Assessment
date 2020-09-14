from data_layer.models.base import Base
import sqlalchemy as sql
from sqlalchemy.orm import relationship
from .users import Users


class Notes(Base):
    __tablename__ = "notes"
    id = sql.Column(sql.Integer, primary_key=True)
    title = sql.Column(sql.String)
    description = sql.Column(sql.Text)
    user_id = sql.Column(sql.Integer, sql.ForeignKey('users.id'))
    user = relationship(Users)

    def __repr__(self):
        return f"<Note (id={self.id}, title={self.title})>"

