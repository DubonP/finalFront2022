import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import citaReducer from '../quote/citaSlice';
import Cita from '../quote/Cita';
import { screen } from '@testing-library/dom';
import { store } from '../../app/store';

function renderWithReduxProvider(element: ReactElement) {
    const store = configureStore({
        reducer: {
            quote: citaReducer,
        }
    });
  return render(element, { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> 
});
}

describe('Cita', () => {
    describe("When render the defalt state", () => {
        it("Nenhuma citação encontrada", async () => {
            render(
                <Provider store={store}>
                    <Cita />
                </Provider>
            );
            expect(await screen.findByText("Nenhuma citação encontrada")).toBeInTheDocument();
        });
    });
});