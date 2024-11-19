<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_name',    // Ajout de user_name
        'firstname',
        'lastname',
        'age',
        'tel',
        'address',
        'email',
        'password',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Vérifie si l'utilisateur est un administrateur.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin'; // Si le rôle est 'admin', retourne true
    }

    // Relation avec les actualités : Un utilisateur peut avoir plusieurs actualités
    public function actualites()
    {
        return $this->hasMany(Actualite::class, 'user_id', 'id'); // Utilise 'user_id' comme clé étrangère
    }
}

