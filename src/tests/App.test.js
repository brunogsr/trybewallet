import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const dataTestEmail = 'email-input';
const dataTestPassword = 'password-input';
const dataTestLogin = 'login-submit-button';
const validEmail = 'alguem@alguem.com';

describe('Testando Login Page', () => {
  renderWithRouterAndRedux(<App />);
  const email = screen.getByTestId(dataTestEmail);
  const password = screen.getByTestId(dataTestPassword);
  const login = screen.getByTestId(dataTestLogin);
  it('Verifica se a página contém os campos Email, Password e Login', () => {
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });
  it('Verifica se o botão está desabilitado quando o email e a senha são inválidos', () => {
    expect(login).toBeDisabled();
    userEvent.type(email, /email/i);
    userEvent.type(password, /1234567/i);
    expect(login).toBeDisabled();
    userEvent.type(email, /alguem@alguem.com/i);
    userEvent.type(password, /12345/i);
    expect(login).toBeDisabled();
  });
  it('Verifica se o botão está habilitado quando o email e a senha são válidos', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(dataTestEmail), validEmail);
    userEvent.type(screen.getByTestId(dataTestPassword), '1234567');
    expect(screen.getByTestId(dataTestLogin)).toBeEnabled();
  });
  it('Verifica se ao clicar no botão habilitado, a rota muda para a /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(dataTestEmail), validEmail);
    userEvent.type(screen.getByTestId(dataTestPassword), '1234567');
    userEvent.click(screen.getByTestId(dataTestLogin));
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Testando header', () => {
  it('Verifica se o dinheiro se inicia em 0.00 e se o email e BRL estão sendo mostrados no header', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(dataTestEmail), validEmail);
    userEvent.type(screen.getByTestId(dataTestPassword), '1234567');
    userEvent.click(screen.getByTestId(dataTestLogin));
    const getValidEmail = screen.getByText(validEmail);
    const currencie = screen.getByText(/brl/i);
    const money = screen.getByText(/0.00/i);
    expect(money).toBeInTheDocument();
    expect(currencie).toBeInTheDocument();
    expect(getValidEmail).toBeInTheDocument();
  });
});

describe('Testando Wallet', () => {
  it('Verifica se os campos de valor, descrição, moeda, método e tag estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(dataTestEmail), validEmail);
    userEvent.type(screen.getByTestId(dataTestPassword), '1234567');
    userEvent.click(screen.getByTestId(dataTestLogin));
    const value = screen.getByTestId(/value-input/i);
    const description = screen.getByTestId(/description-input/i);
    const currency = screen.getByTestId(/currency-input/i);
    const method = screen.getByTestId(/method-input/i);
    const tag = screen.getByTestId(/tag-input/i);
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });

  it('Verifica se ao adicionar uma despesa, ela aparece na tela corretamente e se o botão de delete funciona corretamente', async () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(dataTestEmail), validEmail);
    userEvent.type(screen.getByTestId(dataTestPassword), '1234567');
    userEvent.click(screen.getByTestId(dataTestLogin));
    const value = screen.getByTestId(/value-input/i);
    const description = screen.getByTestId(/description-input/i);
    const currency = screen.getByTestId(/currency-input/i);
    const method = screen.getByTestId(/method-input/i);
    const tag = screen.getByTestId(/tag-input/i);
    const addButton = screen.getByText(/adicionar despesa/i);
    userEvent.type(value, '500');
    userEvent.type(description, 'BLABLABLA');
    userEvent.type(currency, 'USD');
    userEvent.type(method, 'Cartão de crédito');
    userEvent.type(tag, 'Lazer');
    userEvent.click(addButton);

    await waitFor(() => {
      const descriptionTd = screen.getByTestId(/description-td/i);
      const convertedValue = screen.getByTestId(/converted-value/i);
      const descriptionText = screen.getByText(/BLABLABLA/i);
      expect(descriptionText).toBeInTheDocument();
      expect(descriptionTd).toBeInTheDocument();
      expect(convertedValue).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId(/delete-btn/i); // Só depois de adicionar a despesa o botão delete aparece.
    userEvent.click(deleteButton);

    await waitFor(() => {
      const descriptionTd = screen.queryByTestId(/description-td/i);
      const convertedValue = screen.queryByTestId(/converted-value/i);
      const descriptionText = screen.queryByText(/BLABLABLA/i);
      expect(descriptionText).not.toBeInTheDocument();
      expect(descriptionTd).not.toBeInTheDocument();
      expect(convertedValue).not.toBeInTheDocument();
    });
  });
});
