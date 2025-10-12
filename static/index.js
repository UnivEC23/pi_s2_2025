
const API_URL = 'http://localhost:5000/api';


//para o futuro
// window.location.assign("/clientes"); 

function semPost(e) {
	e.preventDefault();
	return false;
}



// document.getElementById('form_orca').addEventListener('submit', function (event) {
// 	const nome = document.getElementById('nome').value;
// 	const email = document.getElementById('email').value;
// 	const solicit = document.getElementById('solicit').value;

// 	if (!nome || !email || !solicit) {
// 		alert('Por favor, preencha todos os campos.');
// 		event.preventDefault();
// 		return;
// 	}

// });

// document.getElementById('formComentario').addEventListener('submit', function (event) {
// 	event.preventDefault();
// 	enviarComentario();
// });



function limpar(id_form) {
	document.getElementById(id_form).reset();
}

function abrirModal(string) {
	document.getElementById(string).classList.add('is-active');
}
function fecharModal(string) {
	document.getElementById(string).classList.remove('is-active');
}


// function abrirModal() {
//     abrir('modalLogin');
// }
// function fecharModal() {
//     fechar('modalLogin');
// }
// function fecharModal() {
// 	document.getElementById('modalLogin').classList.remove('is-active');
// }

function fecharOrca() {
	const erroCom = document.getElementById('erroSoli');
	erroCom.classList.add("is-hidden");
	limpar('form_orca');
	fecharModal('modalOrcamento');
}

async function submitOrca() {
	const nome = document.getElementById('nome').value.trim();
	const email = document.getElementById('email').value.trim();
	const solicit = document.getElementById('solicit').value.trim();
	const erroSoli = document.getElementById('erroSoli');

	if (!nome || !email || !solicit) {
		// alert('Por favor, preencha todos os campos.');
		erroSoli.classList.remove("is-hidden");
		// event.preventDefault();
		return;
	}
	else {
		erroSoli.classList.add("is-hidden");

		try {
			const response = await fetch(`${API_URL}/orca`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ nome: nome, email: email, solicit: solicit })
			});


			const data = await response.json();

			if (response.ok) {
				fecharOrca()

				// window.location.reload();
				// alert(data.mensagemok);
			} else {
				console.error('Erro ao enviar orçamento:', response.status);
				// alert(data.erro);
			}
		} catch (error) {
			console.error('Erro ao enviar orçamento:', error);
			// alert(data.mensagemoff)
		}
	}
}

function fecharLogin() {
	const login_incompleto = document.getElementById('loginIncompleto');
	const login_erro = document.getElementById('loginErro');
	login_incompleto.classList.add("is-hidden");
	login_erro.classList.add("is-hidden");
	limpar('form_login');
	fecharModal('modalLogin');
}

async function submitLogin() {
	const usern = document.getElementById('usern').value.trim();
	const passw = document.getElementById('passw').value.trim();
	const login_incompleto = document.getElementById('loginIncompleto');
	const login_erro = document.getElementById('loginErro');

	if (!usern || !passw) {
		// alert('Por favor, preencha todos os campos.');
		login_incompleto.classList.remove("is-hidden");
		// event.preventDefault();
		return;
	}
	else {
		login_incompleto.classList.add("is-hidden");

		try {
			const response = await fetch(`${API_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ usern: usern, passw: passw })
			});


			const data = await response.json();

			if (response.ok) {
				login_erro.classList.add("is-hidden");
				fecharModal('modalLogin');
				window.location.assign(data.rota);

				// window.location.reload();
				// alert(data.mensagemok);
			}
			// else if (response.redirected) {
			// 	login_erro.classList.add("is-hidden");
			// 	fecharModal('modalLogin');
			// 	// window.location = response.url;
			// 	window.location.href = response.url;
			// 	// window.location.assign(response.url);

			// 	// window.location.reload();
			// 	// alert(data.mensagemok);
			// }
			else {
				console.error('Erro ao tentar login:', response.status);
				login_erro.classList.remove("is-hidden");
				// alert(data.erro);
			}
		} catch (error) {
			console.error('Erro ao realizar login:', error);
			// alert(data.mensagemoff)
		}
	}
}

// async function login() {
// 	const username = document.getElementById('usern').value;
// 	const password = document.getElementById('passw').value;
// 	console.log(username);
// 	// if (input.value.trim() !== '') {
// 	//     const response = await fetch(`${API_URL}/clientes`, {
// 	//         method: 'POST',
// 	//         headers: {
// 	//             'Content-Type': 'application/json',
// 	//         },
// 	//         body: JSON.stringify({ nome: input.value }),
// 	//     });
// 	//     if (response.ok) {
// 	//         input.value = '';
// 	//         pegaClientes();
// 	//     }
// 	// }

// 	// fecharModal();
// }

