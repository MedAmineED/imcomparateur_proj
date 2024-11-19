import axios from "axios";
import { ActualityEntity } from "../entities/ActualityEntity";

class ActualityServices {

  // Get a list of all actualities
  static async GetAllActualities(url: string): Promise<ActualityEntity[]> {
    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in GetAllActualities:", error);
      throw error;
    }
  }

  // Create a new actuality (Post method)
  static async CreateActuality(url: string, actuality: FormData): Promise<ActualityEntity> {
    try {
      const response = await axios.post(url, actuality, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating actuality:", error);
      throw error;
    }
  }

  // Update an existing actuality (Put method)
  static async UpdateActuality(url: string, id: number, actuality: FormData): Promise<ActualityEntity> {
    try {
      const response = await axios.put(`${url}/${id}`, actuality, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating actuality:", error);
      throw error;
    }
  }

  // Delete an actuality
  static async DeleteActuality(url: string, id: number): Promise<void> {
    try {
      await axios.delete(`${url}/${id}`, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
        },
      });
    } catch (error) {
      console.error("Error deleting actuality:", error);
      throw error;
    }
  }
}

export default ActualityServices;
