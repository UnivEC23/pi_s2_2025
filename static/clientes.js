
const API_URL = 'http://localhost:5000/api';

// async function pegaClientes1() {
// 	const response = await fetch(`${API_URL}/clientes`);
// 	const clientes = await response.json();
// 	console.log("clientes:\n" + clientes);
// 	const list = document.getElementById('listaClientes');
// 	list.innerHTML = '';
// 	clientes[0].forEach(cliente => {
// 		const li = document.createElement('li');
// 		li.textContent = cliente.content;
// 		const deleteBtn = document.createElement('button');
// 		deleteBtn.textContent = 'Delete';
// 		// deleteBtn.onclick = () => deleteItem(cliente._id);
// 		deleteBtn.onclick = () => deleteItem(cliente.nome);
// 		li.appendChild(deleteBtn);
// 		list.appendChild(li);
// 	});
// }

function limpar(id_form) {
	document.getElementById(id_form).reset();
}

function abrirClientes() {
	document.getElementById('box_clientes').classList.remove("is-hidden");
	document.getElementById('botaoClientes').classList.add("is-hidden");
}

function fecharClientes() {
	document.getElementById('box_clientes').classList.add("is-hidden");
	document.getElementById('botaoClientes').classList.remove("is-hidden");
	document.getElementById('erroSoli').classList.add("is-hidden");
	limpar('formSolicit');
}

async function adiClientes() {
	const nome = document.getElementById('nome').value.trim();
	const email = document.getElementById('email').value.trim();
	const solicit = document.getElementById('solicit').value.trim();
	const erroSoli = document.getElementById('erroSoli');

	if (!nome || !email || !solicit) {
		erroSoli.classList.remove("is-hidden");
		return;
	}
	else {
		// console.log(" adiclientes", nome, email, solicit)
		erroSoli.classList.add("is-hidden");

		const response = await fetch(`${API_URL}/clientes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ nome: nome, email: email, solicit: solicit }),
		});
		if (response.ok) {
			limpar('formSolicit');
			// nome.value = '';
			// email.value = '';
			// solicit.value = '';
			pegaClientes();
		}
		else {
			console.error('Erro ao adicionar solicitação:', response.status);
			// alert(data.erro);
		}
	}
}

async function removerCliente(_nome) {
	const response = await fetch(`${API_URL}/clientes`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ nome: _nome }),
	});
	if (response.ok) {
		pegaClientes();
	}
}

async function pegaClientes() {

	fetch(`${API_URL}/clientes`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// console.log(data.length);
			if (data.length > 0) {
				document.getElementById('listaCBox').classList.remove('is-hidden');
				const list = document.getElementById('listaClientes');
				list.innerHTML = '';
				console.log(data);
				console.log(typeof data);
				data.forEach(cliente => {
					const li = document.createElement('li');
					// li.textContent = cliente.nome 
					li.className = "list-item is-inline-flex";
					const nome_div = document.createElement('div');
					nome_div.textContent = cliente.nome
					nome_div.className = "list-item-content";
					// div.className = "list-item-title";
					li.appendChild(nome_div);

					const email_div = document.createElement('div');
					email_div.textContent = cliente.email
					email_div.className = "list-item-content";
					// div.className = "list-item-title";
					li.appendChild(email_div);

					const solicit_div = document.createElement('div');
					solicit_div.textContent = cliente.solicit
					solicit_div.className = "list-item-content";
					// div.className = "list-item-title";
					li.appendChild(solicit_div);

					const deleteBtn = document.createElement('button');
					deleteBtn.textContent = 'Delete';
					deleteBtn.className = "button is-danger list-item-controls";
					// deleteBtn.onclick = () => removerCliente(cliente._id);
					deleteBtn.onclick = () => removerCliente(cliente.nome);
					li.appendChild(deleteBtn);
					list.appendChild(li);
				});
			}
			else {
				document.getElementById('listaClientes').replaceChildren();
				document.getElementById('listaCBox').classList.add('is-hidden');
			}
		})
		.catch(error => {
			console.error('Problema ao recuperar comentários:', error);
		});
}

function abrirComent() {
	document.getElementById('box_coment').classList.remove("is-hidden");
	document.getElementById('botaoComent').classList.add("is-hidden");
}

function fecharComent() {
	document.getElementById('box_coment').classList.add("is-hidden");
	document.getElementById('botaoComent').classList.remove("is-hidden");
	document.getElementById('erroCom').classList.add("is-hidden");
	limpar('formComentario');
}

async function adiCmt() {
	const nome = document.getElementById('nomeComentario').value.trim();
	const comentário = document.getElementById('textoComentario').value.trim();
	const erroCom = document.getElementById('erroCom');

	if (!nome || !comentário) {
		erroCom.classList.remove("is-hidden");
	}
	else {
		erroCom.classList.add("is-hidden");

		try {
			const response = await fetch(`${API_URL}/comentarios`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ autor: nome, texto: comentário })
			});


			// const data = await response.json();

			if (response.ok) {
				pegaCmts()
				limpar('formComentario');

				// window.location.reload();
				// alert(data.mensagemok);
			} else {
				console.error('Erro ao enviar comentário:', response.status);
				// alert(data.erro);
			}
		} catch (error) {
			console.error('Erro ao enviar comentário:', error);
			// alert(data.mensagemoff)
		}
	}

}

async function pegaCmts() {

	fetch(`${API_URL}/comentarios`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// console.log(data.length);
			if (data.length > 0) {
				document.getElementById('listaCoBox').classList.remove('is-hidden');
				const list = document.getElementById('listaComents');
				list.innerHTML = '';
				console.log(data);
				console.log(typeof data);
				data.forEach(coment => {
					const li = document.createElement('li');
					// li.textContent = cliente.nome 
					li.className = "list-item is-inline-flex";
					const div_geral = document.createElement('div');

					const autor_div = document.createElement('div');
					autor_div.textContent = coment.autor
					autor_div.className = "list-item-content";
					// div.className = "list-item-title";
					div_geral.appendChild(autor_div);

					const texto_div = document.createElement('div');
					texto_div.textContent = coment.texto
					texto_div.className = "list-item-content";
					// div.className = "list-item-title";
					div_geral.appendChild(texto_div);

					li.appendChild(div_geral);

					const deleteBtn = document.createElement('button');
					deleteBtn.textContent = 'Delete';
					deleteBtn.className = "button is-danger list-item-controls";
					// deleteBtn.onclick = () => removerCliente(cliente._id);
					console.log(coment.data_criacao);
					deleteBtn.onclick = () => removerCmts(coment.autor, coment.data_criacao);
					li.appendChild(deleteBtn);

					list.appendChild(li);
				});
			}
			else {
				document.getElementById('listaComents').replaceChildren();
				document.getElementById('listaCoBox').classList.add('is-hidden');
			}
		})
		.catch(error => {
			console.error('Problema ao recuperar comentários:', error);
		});
}

async function removerCmts(autor, data) {
	const response = await fetch(`${API_URL}/comentarios`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ autor: autor, data: data }),
	});
	if (response.ok) {
		pegaCmts();
	}
}

pegaCmts();
pegaClientes();
