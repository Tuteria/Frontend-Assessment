from data_layer.models.base import Base
import sqlalchemy as sql

class Users(Base):
    __tablename__ = 'users'

    id = sql.Column(sql.Integer, autoincrement=True, primary_key=True)
    username = sql.Column(sql.String(100), unique=True, nullable=False)
    email = sql.Column(sql.String(100), nullable=False, unique=True)
    password = sql.Column(sql.String(100), nullable=False)
    is_admin = sql.Column(sql.Boolean, nullable=False, default=False)

    def __repr__(self):
        return '<User: {}>'.format(self.name)
