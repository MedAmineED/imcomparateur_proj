<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of clients.
     */
    public function index()
    {
        return response()->json(Client::all());
    }

    /**
     * Store a new client in the database.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname'  => 'required|string|max:255',
            'age'       => 'required|integer|min:0',
            'tel'       => 'required|string|max:15',
            'address'   => 'required|string|max:255',
            'email'     => 'required|email|unique:clients,email',
        ]);

        $client = Client::create($validatedData);
        return response()->json($client, 201);
    }

    /**
     * Display the specified client.
     */
    public function show($id)
    {
        $client = Client::findOrFail($id);
        return response()->json($client);
    }

    /**
     * Update the specified client in the database.
     */
    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname'  => 'required|string|max:255',
            'age'       => 'required|integer|min:0',
            'tel'       => 'required|string|max:15',
            'address'   => 'required|string|max:255',
            'email'     => 'required|email|unique:clients,email,' . $id,
        ]);

        $client->update($validatedData);
        return response()->json($client);
    }

    /**
     * Remove the specified client from the database.
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'Client deleted successfully']);
    }
}
