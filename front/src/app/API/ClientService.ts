import axios, { AxiosError } from 'axios';
import ApiUrls from './ApiURLs/ApiURLs';

export interface ClientEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

class ClientService {
    /**
     * Fetch all clients.
     * @returns Promise<ClientEntity[]>
     */
    async getAllClients(): Promise<ClientEntity[]> {
        try {
            const response = await axios.get<ClientEntity[]>(ApiUrls.CLIENT);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, 'Erreur lors de la récupération des clients');
        }
    }

    /**
     * Create a new client.
     * @param client ClientEntity
     * @returns Promise<ClientEntity>
     */
    async createClient(client: ClientEntity): Promise<ClientEntity> {
        try {
            const response = await axios.post<ClientEntity>(ApiUrls.CLIENT, client);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, 'Erreur lors de la création du client');
        }
    }

    /**
     * Update an existing client by ID.
     * @param id number
     * @param client ClientEntity
     * @returns Promise<ClientEntity>
     */
    async updateClient(id: number, client: ClientEntity): Promise<ClientEntity> {
        try {
            const response = await axios.put<ClientEntity>(`${ApiUrls.CLIENT}/${id}`, client);
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, `Erreur lors de la mise à jour du client avec l'ID ${id}`);
        }
    }

    /**
     * Delete a client by ID.
     * @param id number
     * @returns Promise<void>
     */
    async deleteClient(id: number): Promise<void> {
        try {
            await axios.delete(`${ApiUrls.CLIENT}/${id}`);
        } catch (error) {
            this.handleAxiosError(error, `Erreur lors de la suppression du client avec l'ID ${id}`);
        }
    }

    /**
     * Handle Axios errors gracefully.
     * @param error unknown
     * @param customMessage string
     * @throws Error
     */
    private handleAxiosError(error: unknown, customMessage: string): never {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const errorMessage = 
                typeof axiosError.response?.data === 'string'
                    ? axiosError.response.data
                    : customMessage; // Use custom message if data is not a string
    
            console.error(`${customMessage}:`, axiosError.response?.data || axiosError.message);
            throw new Error(errorMessage);
        } else {
            console.error(`${customMessage}:`, error);
            throw new Error(customMessage);
        }
    }
}

const clientService = new ClientService();
export default clientService;
