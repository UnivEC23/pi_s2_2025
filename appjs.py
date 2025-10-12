from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, abort, redirect, render_template, request, jsonify, Response, url_for
import sys
import os
from interfaces import clientes_sql, clientes_sqla
from init import app, db
from modelos import Comentario
from sqlalchemy import desc


id_clientes = 0
tClientes = clientes_sqla()

login_usuario = "user"
login_senha = "pass"
logado = False


# ---------paginas ativas--------------------------

@app.route('/', methods=['GET'])
def home():
    comentarios = pegar_comentarios()
    # if request.method == 'GET':
    return render_template('indexjs.html', comentarios=comentarios)
    # elif request.method == 'POST':
    #     novo = request.form
    #     if not novo.get("nome") or not novo.get("email") or not novo.get("solicit"):
    #         return render_template('indexjs.html', form_error="Por favor, preencha todos os campos do formulário.", comentarios=comentarios)

    # tClientes.adicionar(novo.get("nome"), novo.get(
    #     "email"), novo.get("solicit"))
    # return render_template('indexjs.html', comentarios=comentarios)


# @app.route('/clientes', methods=['POST'])
# def clientes():
#     login = request.form
#     # if not login.get("username") or not login.get("password"):
#     #     return render_template('indexjs.html', login_error="Por favor, preencha todos os campos do login.", comentarios=pegar_comentarios())

#     if login.get("username") == login_usuario and login.get("password") == login_senha:
#         return render_template('clientes.html')
#     else:
#         return render_template('indexjs.html', login_error="Usuário ou senha incorretos.", comentarios=pegar_comentarios())

# adicionado para testes sem login


@app.route('/clientes', methods=['GET'])
def clientesget():
    if logado == True:
        return render_template('clientes.html')
    else:
        abort(401)
        # return jsonify({'msg': 'Acesso não autorizado!'}), 401


# --------api clientes------------------

@app.route('/api/clientes', methods=['GET'])
def clientesGet():
    return tClientes.pegarTodos()


@app.route('/api/clientes', methods=['POST'])
def clientesPost():
    nome = request.json["nome"]
    email = request.json["email"]
    solicit = request.json["solicit"]

    # print(nome, email, solicit)

    return tClientes.adicionar(nome, email, solicit)


@app.route('/api/clientes', methods=['DELETE'])
def clientesDel():
    # pegando nome
    nome = request.json["nome"]
    return tClientes.deletar(nome)

# --------api comentarios-----------------


@app.route('/api/comentarios', methods=['POST'])
def comentariosPost():
    try:
        data = request.get_json()
        autor = data.get('autor')
        texto = data.get('texto')

        # if not autor or not texto:
        #     return jsonify({'erro': 'Autor e texto são obrigatórios.'})

        novo_comentario = Comentario(autor=autor, texto=texto)
        db.session.add(novo_comentario)
        db.session.commit()
        # return jsonify({"error": "Incorrect credentials"}), 401

        # return jsonify({'msg': 'Comentário adicionado com sucesso!'}), 201
        comentarios = pegar_comentarios()
        return render_template('indexjs.html', comentarios=comentarios)
    except Exception as e:
        print('Erro ao adicionar comentário: ' + e)
        return 500


@app.route('/api/comentarios', methods=['GET'])
def comentariosGet():
    try:
        comentarios = pegar_comentarios()
        # clientes = Clientes.query.all()

        return jsonify(comentarios), 200
    except Exception as e:
        print("erro ao GET Clientes")
        print(e)
        return {}, 500
    # try:
    #     data = request.get_json()
    #     autor = data.get('autor')
    #     texto = data.get('texto')

    #     # if not autor or not texto:
    #     #     return jsonify({'erro': 'Autor e texto são obrigatórios.'})

    #     novo_comentario = Comentario(autor=autor, texto=texto)
    #     db.session.add(novo_comentario)
    #     db.session.commit()
    #     # return jsonify({"error": "Incorrect credentials"}), 401

    #     return jsonify({'msg': 'Comentário adicionado com sucesso!'}), 201
    # except Exception as e:
    #     print('Erro ao pegar comentários: ' + e)
    #     return 500


@app.route('/api/comentarios', methods=['DELETE'])
def comentariosDel():
    try:
        autor = request.json["autor"]
        # data = request.json["data"]
        # dTime = datetime.strptime(data, )
        # print(data)
        # se filtrar pelo primeiro---
        # cmt = Comentario.query.filter_by(data_criacao=dTime).first()
        # db.session.delete(cmt)
        # ---

        # se pegar todos----
        cmts = Comentario.query.filter_by(autor=autor).all()
        for c in cmts:
            db.session.delete(c)
        # ----

        db.session.commit()
        return {}, 200
    except Exception as e:
        print("erro ao deletar comentário")
        print(e)
        return {}, 500

# ------------------------------

# --------api orçamento-----------------


@app.route('/api/orca', methods=['POST'])
def adicionar_orçamento():
    try:
        data = request.get_json()
        nome = data.get('nome')
        email = data.get('email')
        solicit = data.get('solicit')

        tClientes.adicionar(nome, email, solicit)

        return jsonify({'msg': 'Orçamento adicionado com sucesso!'}), 201
    except Exception as e:
        print('Erro ao adicionar orçamento: ' + e)
        return 500
# ------------------------------

# --------api login-----------------


@app.route('/api/login', methods=['POST'])
def login():
    global logado
    try:
        data = request.get_json()
        usern = data.get('usern')
        passw = data.get('passw')

        if usern == login_usuario and passw == login_senha:
            # return clientesget(), 200
            logado = True
            return jsonify({'rota': url_for('clientesget')}), 200
            # return redirect(url_for('clientesget'))
            # with app.app_context():
            # return render_template('clientes.html')
        else:
            print('login ou senha incorretos!')
            return jsonify({'msg': 'login ou senha incorretos!'}), 401
    except Exception as e:
        print('Erro ao tentar login: ' + e)
        return 500


@app.route('/api/deslogin', methods=['POST'])
def deslogin():
    global logado
    logado = False
    # try:
    # print("saindo")
    # return redirect(url_for('home'))
    return jsonify({'rota': url_for('home')}), 200
    # return 200

    # except Exception as e:
    #     print('Erro ao tentar realizas deslogin: ' + e)
    #     return 500
# ------------------------------


def rodar():
    # port = int(os.environ.get('PORT', 5000))
    # app.run(debug=True, host='0.0.0.0', port=port)
    # app.run(debug=True, host='0.0.0.0', port=5000)
    # app.run(debug=True, host='127.0.0.1', port=5000)
    app.run(debug=True, host='localhost', port=5000)
    # app.run()


def pegar_comentarios():
    with app.app_context():
        try:
            # comentarios = Comentario.query.order_by(
            #     desc(Comentario.data_criacao)).limit(3).all()
            comentarios = Comentario.query.order_by(
                desc(Comentario.data_criacao)).all()
            return comentarios
        except Exception as e:
            print("Erro ao buscar comentários:", e)
            return []


if __name__ == "__main__":

    if (len(sys.argv) > 1):
        if (sys.argv[1] == "sql"):
            tClientes = clientes_sql()

    tClientes.criarTabela()
    with app.app_context():
        db.create_all()  # crias as tabelas
    rodar()
