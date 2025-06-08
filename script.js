document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos HTML
    const btnCadastro = document.getElementById('btn-cadastro');
    const btnLogin = document.getElementById('btn-login');
    const goToLoginBtn = document.getElementById('go-to-login');

    const heroSection = document.getElementById('hero-section');
    const cadastroSection = document.getElementById('cadastro-section');
    const loginSection = document.getElementById('login-section');
    const successSection = document.getElementById('success-section');

    const cadastroForm = document.getElementById('cadastro-form');
    const loginForm = document.getElementById('login-form');

    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    const emailError = document.getElementById('email-error');
    const senhaError = document.getElementById('senha-error');
    const confirmarSenhaError = document.getElementById('confirmar-senha-error');
    const cadastroMessage = document.getElementById('cadastro-message');
    const loginMessage = document.getElementById('login-message');

    // Função para mostrar uma seção e esconder as outras
    function showSection(sectionToShow) {
        const sections = [heroSection, cadastroSection, loginSection, successSection];
        sections.forEach(section => {
            if (section === sectionToShow) {
                section.classList.remove('hidden');
                section.classList.add('active');
            } else {
                section.classList.add('hidden');
                section.classList.remove('active');
            }
        });
    }

    // Event Listeners para botões de navegação
    btnCadastro.addEventListener('click', () => showSection(cadastroSection));
    btnLogin.addEventListener('click', () => showSection(loginSection));
    goToLoginBtn.addEventListener('click', () => showSection(loginSection));


    // Validação do Formulário de Cadastro (Front-end)
    cadastroForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true;
        emailError.textContent = '';
        senhaError.textContent = '';
        confirmarSenhaError.textContent = '';
        cadastroMessage.textContent = '';
        cadastroMessage.classList.remove('success', 'error');

        // Validação de Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Por favor, insira um email válido.';
            isValid = false;
        }

        // Validação de Senha (ex: mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número)
        const senhaValue = senhaInput.value;
        const senhaMinLength = 8;
        const hasUpperCase = /[A-Z]/.test(senhaValue);
        const hasLowerCase = /[a-z]/.test(senhaValue);
        const hasNumber = /[0-9]/.test(senhaValue);

        if (senhaValue.length < senhaMinLength) {
            senhaError.textContent = `A senha deve ter pelo menos ${senhaMinLength} caracteres.`;
            isValid = false;
        } else if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            senhaError.textContent = 'A senha deve conter letras maiúsculas, minúsculas e números.';
            isValid = false;
        }

        // Confirmação de Senha
        if (senhaInput.value !== confirmarSenhaInput.value) {
            confirmarSenhaError.textContent = 'As senhas não coincidem.';
            isValid = false;
        }

        // Se todas as validações passarem
        if (isValid) {
            // Aqui é onde você enviaria os dados para o backend (API)
            // Por enquanto, vamos simular um sucesso
            cadastroMessage.textContent = 'Processando seu cadastro...';
            cadastroMessage.classList.add('success');

            setTimeout(() => {
                showSection(successSection); // Mostra a seção de sucesso
                cadastroForm.reset(); // Limpa o formulário
            }, 1500); // Simula um pequeno atraso de processamento
        } else {
            cadastroMessage.textContent = 'Por favor, corrija os erros no formulário.';
            cadastroMessage.classList.add('error');
        }
    });

    // Simulação do Formulário de Login (Front-end)
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        loginMessage.textContent = '';
        loginMessage.classList.remove('success', 'error');

        const loginEmail = document.getElementById('login-email').value;
        const loginSenha = document.getElementById('login-senha').value;

        // Validação simples para demonstração
        if (loginEmail === 'teste@exemplo.com' && loginSenha === 'Senha123') {
            loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
            loginMessage.classList.add('success');
            // Em um sistema real, aqui você redirecionaria para o painel do usuário
            setTimeout(() => {
                alert('Bem-vindo de volta! (Simulando redirecionamento para o painel)');
                loginForm.reset();
                showSection(heroSection); // Volta para a página inicial
            }, 1500);
        } else {
            loginMessage.textContent = 'Email ou senha incorretos.';
            loginMessage.classList.add('error');
        }
    });

    // Mostrar a seção hero inicialmente
    showSection(heroSection);
});