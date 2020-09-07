from data_layer.models.base import Base
import sqlalchemy as sql


class Admins(Base):
    __tablename__ = "admins"
    id = sql.Column(sql.Integer, primary_key=True)
    key = sql.Column(sql.String)
    hash = sql.Column(sql.String)

    def __repr__(self):
        return f"<Admin (id={self.id}, key={self.key})>"
