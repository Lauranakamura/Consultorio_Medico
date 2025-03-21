CREATE TABLE Especialidade (
    ID INT PRIMARY KEY IDENTITY(1, 1),
    NomeEspecialidade NVARCHAR(255) NOT NULL
);

CREATE TABLE Medico (
    ID INT PRIMARY KEY IDENTITY(1, 1),
    NomeMedico NVARCHAR(255) NOT NULL,
    EspecialidadeID INT,
    FOREIGN KEY (EspecialidadeID) REFERENCES Especialidade(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Paciente (
    ID INT PRIMARY KEY IDENTITY(1, 1),
    NomePaciente NVARCHAR(255) NOT NULL,
    DataNascimento VARCHAR(255),
    CPF NVARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL 
);

CREATE TABLE Usuario (
    ID INT PRIMARY KEY IDENTITY(1, 1),
    NomeUsuario NVARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
	Senha VARCHAR(255) NOT NULL
);

CREATE TABLE TipoConsulta (
    ID INT PRIMARY KEY IDENTITY(1, 1),
    NomeTipoConsulta NVARCHAR(255) NOT NULL
);

CREATE TABLE StatusConsulta (
    ID INT PRIMARY KEY IDENTITY(1, 1),
    NomeStatusConsulta NVARCHAR(255) NOT NULL
);

CREATE TABLE ConsultaMedica (
    ID INT PRIMARY KEY IDENTITY(1, 1),
    DataConsulta VARCHAR(255) NOT NULL,
    HoraConsulta TIME NOT NULL,
    MedicoID INT,
    PacienteID INT,
    TipoConsultaID INT,
    StatusConsultaID INT,
    FOREIGN KEY (MedicoID) REFERENCES Medico(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PacienteID) REFERENCES Paciente(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (TipoConsultaID) REFERENCES TipoConsulta(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (StatusConsultaID) REFERENCES StatusConsulta(ID) ON DELETE CASCADE ON UPDATE CASCADE
);
