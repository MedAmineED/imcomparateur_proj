<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Afficher le formulaire pour créer un nouvel utilisateur
    public function create()
    {
        return view('admin.users.create');
    }

    // Enregistrer un nouvel utilisateur avec un user_name et un mot de passe
    public function store(Request $request)
    {
        // Valider les entrées de l'utilisateur
        $validated = $request->validate([
            'user_name' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Créer un nouvel utilisateur
        $user = User::create([
            'user_name' => $validated['user_name'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur créé avec succès');
    }
}
