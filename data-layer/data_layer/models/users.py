from data_layer.models.base import Base
import sqlalchemy as sql


class User(Base):
  __tablename__ = "users"

  id = sql.Column(sql.Integer, primary_key=True)
  username = sql.Column(sql.String, unique=True)
  password = sql.Column(sql.String)
  email = sql.Column(sql.String, unique=True)
  role = sql.Column(sql.String, default="user")

  def __repr__(self):
    return f"<User (id={self.id}, username={self.username})>"
