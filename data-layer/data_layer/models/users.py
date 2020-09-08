from data_layer.models.base import Base
import sqlalchemy as sql


class User(Base):
	__tablename__ = "users"
	id = sql.Column(sql.Integer, primary_key=True)
	username = sql.Column(sql.String(50), nullable=False, unique=True)
	password = sql.Column(sql.String(50), nullable=False)
	admin = sql.Column(sql.Boolean, nullable=False, default=False)

	def __repr__(self):
		return f"<User (username={self.username} is_admin={self.admin})>"
