<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Http\Request;

class AuthControllers extends Controller
{
    /**
     * Enregistrement d'un nouvel utilisateur.
     */
    public function register(Request $request)
    {
        // Validation des données d'inscription
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'age' => 'required|integer|max:100', // Le champ 'age' doit être un entier et peut être limité à une valeur maximale de 100
            'tel' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Validation du mot de passe et de sa confirmation
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            // Création de l'utilisateur
            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'age' => $request->age,
                'tel' => $request->tel,
                'address' => $request->address,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Hachage du mot de passe
                'role' => 'user',  // Par défaut, on attribue le rôle 'user' (tu peux aussi ajouter un rôle admin si besoin)
            ]);

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            // Log l'erreur pour le débogage
            Log::error('User registration error: ' . $e->getMessage());

            return response()->json([
                'message' => 'User registration failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

 public function login(Request $request)
    {
        // Validation des données de connexion
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Vérifie les informations d'authentification de l'utilisateur
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // L'utilisateur est authentifié, générer un token
            $user = Auth::user();
            $token = $user->createToken('YourAppName')->plainTextToken;

            // Retourner le token
            return response()->json([
                'message' => 'User logged in successfully',
                'token' => $token
            ], 200);
        } else {
            return response()->json([
                'error' => 'Unauthorized, invalid credentials'
            ], 401);
        }
    }

    /**
     * Mise à jour des informations d'un utilisateur.
     * Seuls les administrateurs peuvent mettre à jour un utilisateur.
     */
    public function update(Request $request, User $user)
    {
        // Vérifie si l'utilisateur actuel est un administrateur
        if (auth()->user()->isAdmin()) {
            // Validation des données entrantes
            $validator = Validator::make($request->all(), [
                'user_name' => 'required|string|max:255', // Assurez-vous que 'user_name' existe dans le modèle
                'password' => 'sometimes|string|min:8|confirmed', // Validation conditionnelle pour le mot de passe
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Mise à jour des informations de l'utilisateur
            if ($request->has('user_name')) {
                $user->user_name = $request->input('user_name'); // Mise à jour du nom d'utilisateur
            }

            // Si un mot de passe est fourni, il doit être haché avant la sauvegarde
            if ($request->has('password')) {
                $user->password = Hash::make($request->input('password')); // Hachage du mot de passe
            }

            // Sauvegarde des modifications
            $user->save();

            return response()->json([
                'success' => 'Admin user updated successfully',
                'user' => $user
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 403); // Si l'utilisateur n'est pas admin
        }
    }
}
