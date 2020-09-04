from data_layer.models.base import Base
import sqlalchemy as sql


class Users(Base):
    __tablename__ = "users"
    id = sql.Column(sql.Integer, primary_key=True)
    email = sql.Column(sql.String, unique=True)
    password = sql.Column(sql.String)

    def __repr__(self):
        return f"<User (id={self.id}, email={self.email})>"

