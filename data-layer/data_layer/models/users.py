from data_layer.models.base import Base
from sqlalchemy.orm import relationship
import sqlalchemy as sql


class User(Base):
  __tablename__ = "users"
  id=sql.Column(sql.Integer,primary_key=True)
  username = sql.Column(sql.String)

  def __repr__(self):
    return f"<Note (id={self.id}, username={self.username})>"