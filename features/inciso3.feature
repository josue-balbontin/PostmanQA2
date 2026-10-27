# language: es
@inciso3
Característica: Inciso 3 - Registrar nuevo usuario, ver detalle y prestar libro por 6 días

  @registroYPrestamo6Dias
  Escenario: Registrar un nuevo usuario, iniciar sesión, ver detalle de un libro y prestarlo por 6 días
    Dado que me encuentro en la página de registro
    Y verifico que el formulario de registro esté visible
    Cuando registro un nuevo usuario con credenciales válidas
    Y inicio sesión con el usuario recién registrado
    Y verifico que me encuentro en el catálogo de libros
    Y selecciono ver detalle del primer libro disponible
    Y verifico que la información del libro y la opción de prestar estén visibles
    Y realizo el préstamo del libro seleccionando un plazo de "6" días
    Entonces verifico que el préstamo se registre exitosamente
