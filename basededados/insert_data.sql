INSERT INTO tbl_utilizadores (
	id,
    nome, 
	numero_identificacao, 
	data_nascimento, 
	email, 
	telefone, 
	pais, 
	localidade, 
	`password`, 
	enabled, 
	created_at, 
	updated_at
) VALUES (
	"e54f3cee-4997-49fc-ace8-833d0884b8cc",
	"Tiago Soares", 
    "M001K",
    "1997-10-21",
    "elvizoarez1@gmail.com",
    "9948113",
    "Cabo Verde",
    "Assomada",
    "$2a$12$.hpx0pemGC.dRgwdtqZ7Ze1EV/BoatMFCfQ2Uc4/oSksaIRsOcpiG",
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_orcamento
VALUES (
	NULL,
	200, 
    "e54f3cee-4997-49fc-ace8-833d0884b8cc",
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_servicos 
VALUES (
	null, 
	"Carpintaria",
    "Conserto de portas, janelas, mesas, cadeiras e outros mobiliarios e utensileos de madeira",
    "Caseiro",
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_prestadores 
VALUES (
	"27acc54f-57cd-4b37-8c4a-be0a7bb5b3ac",
    143759005,
    "Carpinteiro",
    0.2,
    1000,
    0.1,
    true,
    true,
    NOW(),
    NOW()
);



