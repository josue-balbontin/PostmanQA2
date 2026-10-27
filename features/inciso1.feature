# language: es
@inciso1
Característica: Inciso 1 - Login para acceder a la página

  @login
  Escenario: Iniciar sesión exitosamente para acceder a la biblioteca
    Dado que me encuentro en la página de inicio de sesión
    Y verifico que el formulario de login esté visible
    Cuando ingreso el usuario "jperez" y la contraseña "Lector123!"
    Entonces debería acceder a la página principal y verificar que el usuario esté autenticado
