from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import DateTime, String
from dataclasses import dataclass
from init import db, engine
from datetime import datetime  # Importe o módulo datetime


@dataclass
class Clientes(db.Model):
    id: int
    nome: str
    email: str
    solicit: str

    id = db.Column(db.Integer, unique=True,
                   primary_key=True, autoincrement=True)
    nome = db.Column(db.String(80), unique=False,
                     nullable=True, primary_key=False)
    email = db.Column(db.String(80), unique=False,
                      nullable=True, primary_key=False)
    solicit = db.Column(db.String(500), unique=False,
                        nullable=True, primary_key=False)

    def __repr__(self):
        return "<Nome: {}>".format(self.nome)


@dataclass
class Comentario(db.Model):
    id: int
    autor: str
    texto: str
    data_criacao: datetime

    id = db.Column(db.Integer, unique=True,
                   primary_key=True, autoincrement=True)
    autor = db.Column(db.String(80), nullable=False)
    texto = db.Column(db.String(500), nullable=False)
    # data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_criacao = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return "<Comentario Autor: {}>".format(self.autor)


class Base_Tur(DeclarativeBase):
    pass


class Comentario_Turso(Base_Tur):
    __tablename__ = "comentarios"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    autor: Mapped[str] = mapped_column(String(80))
    texto: Mapped[str] = mapped_column(String(500))
    data_criacao: Mapped[datetime] = mapped_column(default=datetime.now)

    def __repr__(self) -> str:
        return "<Comentario Autor: {}>".format(self.autor) + "\n<Comentario Texto: {}>".format(self.texto)

    def serializado(self):
        return {
            'id': self.id,
            'autor': self.autor,
            'texto': self.texto,
            'data_criacao': self.data_criacao,
        }
