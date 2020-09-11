from data_layer.models.base import Base
import sqlalchemy as sql


class Admin(Base):
    __tablename__ = "admin"
    id = sql.Column(sql.Integer, primary_key=True)
    username = sql.Column(sql.String, unique=True, index=True)
    email = sql.Column(sql.String, unique=True, index=True)
    password = sql.Column(sql.Text)

    def __repr__(self):
        return f"<User (id={self.id}, username={self.username})>"