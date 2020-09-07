from data_layer.models.base import Base
import sqlalchemy as sql


class Notes(Base):
    __tablename__ = "notes"
    id = sql.Column(sql.Integer, primary_key=True)
    title = sql.Column(sql.String)
    description = sql.Column(sql.Text)
    user_id = sql.Column(sql.Integer)

    def __repr__(self):
        return f"<Note (id={self.id}, title={self.title})>"

class Users(Base):
    __tablename__ = "users"
    id = sql.Column(sql.Integer, primary_key=True, unique=True)
    username = sql.Column(sql.String, unique=True)
    email = sql.Column(sql.String, unique=True)
    is_admin = sql.Column(sql.Boolean)
    password = sql.Column(sql.String)

    def __repr__(self):
        return f"<User (id={self.id}, username={self.username})>"