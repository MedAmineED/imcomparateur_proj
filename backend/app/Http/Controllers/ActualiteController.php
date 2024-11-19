<?php
namespace App\Http\Controllers;

use App\Models\Actualite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Exception;

class ActualiteController extends Controller
{
    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date_creation' => 'required|date',
            'user_id' => 'required|exists:users,id',
            'excerpt' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $date_creation = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $request->date_creation)->format('Y-m-d');

        // Handle image upload with try-catch for error handling
        try {
            $imagePath = null;

            if ($request->hasFile('image')) {
                // Store image in the public disk
                $imagePath = $request->file('image')->store('images/actualites', 'public');
            }

            // Create the Actualite using the validated data and image path
            $actualite = Actualite::create(array_merge($validatedData, ['date_creation' => $date_creation, 'image' => $imagePath]));
            return response()->json($actualite, 201);

        } catch (Exception $e) {
            // Log the error with the request data and any relevant information
            Log::error('Failed to store Actualite: ' . $e->getMessage(), [
                'request_data' => $request->all(),
                'image_path' => $imagePath ?? 'No image uploaded', // Check if imagePath is null
            ]);

            // Return a generic error response with the message and additional details
            return response()->json([
                'error' => 'Failed to save Actualite. Please try again.',
                'message' => $e->getMessage(), // Include the actual error message for debugging
                'request_data' => $request->all(),
                'image_path' => $imagePath ?? 'No image uploaded' // Ensure safe value for logging
            ], 500);
        }
    }

    // Retrieve all Actualités
    public function index()
    {
        try {
            $actualites = Actualite::with('utilisateur')->get(); // Fetches all Actualités with related user info
            return response()->json($actualites, 200);

        } catch (Exception $e) {
            Log::error('Failed to retrieve Actualités: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to retrieve Actualités. Please try again.'], 500);
        }
    }

    // Retrieve a specific Actualité by ID
    public function show($id)
    {
        try {
            $actualite = Actualite::with('utilisateur')->findOrFail($id); // Fetches the Actualité with related user info
            return response()->json($actualite, 200);

        } catch (Exception $e) {
            Log::error('Failed to retrieve Actualité with ID ' . $id . ': ' . $e->getMessage());
            return response()->json(['error' => 'Failed to retrieve Actualité. Please try again.'], 500);
        }
    }


    // Update a specific Actualite
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'date_creation' => 'sometimes|required|date',
            'user_id' => 'sometimes|required|exists:users,id',
            'excerpt' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            $actualite = Actualite::findOrFail($id);

            // Handle new image upload
            if ($request->hasFile('image')) {
                if ($actualite->image) {
                    Storage::disk('public')->delete($actualite->image); // Delete old image
                }
                $validatedData['image'] = $request->file('image')->store('images/actualites', 'public');
            }

            // Update Actualite with validated data
            $actualite->update($validatedData);

            return response()->json($actualite);

        } catch (Exception $e) {
            Log::error('Failed to update Actualite: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update Actualite. Please try again.'], 500);
        }
    }

    // Delete a specific Actualite
    public function destroy($id)
    {
        try {
            $actualite = Actualite::findOrFail($id);

            // Delete the associated image if it exists
            if ($actualite->image) {
                Storage::disk('public')->delete($actualite->image);
            }

            $actualite->delete();

            return response()->json(null, 204);

        } catch (Exception $e) {
            Log::error('Failed to delete Actualite: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete Actualite. Please try again.'], 500);
        }
    }
}
