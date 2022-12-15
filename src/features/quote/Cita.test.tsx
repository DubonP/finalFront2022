import { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import citaReducer from '../quote/citaSlice';
import Cita from '../quote/Cita';
import { screen } from '@testing-library/dom';
import { store } from '../../app/store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

function renderWithReduxProvider(element: ReactElement) {
    const store = configureStore({
        reducer: {
            cita: citaReducer,
        }
    });
  return render(element, { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> 
});
}

describe('App component', () => {
    describe('When something goes wrong with the API', () => {
        const server = setupServer(
            rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ Error: 'Error' }),
                    );
            })
        )
        beforeEach(() => server.listen());
        afterEach(() => {
        server.close()
        server.resetHandlers()
    });
        it('should render the error message', async () => {
            renderWithReduxProvider(<Cita />);

            expect(await screen.getByText('Nenhuma citação encontrada')).toBeInTheDocument();

            screen.debug();
        });
    });

    describe('When the API returns a quote', () => {
        const server = setupServer(
            rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({ quote: "",
                    character: "",
                    image: "",
                    characterDirection: "" }),
                    );
            })
        )
        beforeEach(() => server.listen());
        afterEach(() => {
        server.close()
        server.resetHandlers()
    });
        it('should render the quote', async () => {
            renderWithReduxProvider(<Cita />);

            const input = await screen.findByLabelText('Autor Cita')

            userEvent.click(screen.getByRole("button", { name: /Obter Cita/i }))

            fireEvent.change(input, { target: { value: 'Homer' } })
            
            expect(await screen.findByDisplayValue('Homer')).toBeInTheDocument();

            screen.debug();
        });
    });
});