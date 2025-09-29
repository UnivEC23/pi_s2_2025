
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

function abrir(string) {
	document.getElementById(string).classList.add('is-active');
}
function fechar(string) {
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
	fechar('modalOrcamento');
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
			const response = await fetch('/api/orca', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ nome: nome, email: email, solicit: solicit })
			});


			const data = await response.json();

			if (response.ok) {
				fechar('modalOrcamento');
				limpar('form_orca');

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

async function login() {
	const username = document.getElementById('usern').value;
	const password = document.getElementById('passw').value;
	console.log(username);
	// if (input.value.trim() !== '') {
	//     const response = await fetch(`${API_URL}/clientes`, {
	//         method: 'POST',
	//         headers: {
	//             'Content-Type': 'application/json',
	//         },
	//         body: JSON.stringify({ nome: input.value }),
	//     });
	//     if (response.ok) {
	//         input.value = '';
	//         pegaClientes();
	//     }
	// }

	// fecharModal();
}

