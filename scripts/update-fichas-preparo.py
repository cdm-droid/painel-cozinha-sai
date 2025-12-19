#!/usr/bin/env python3
import sqlite3

db_path = '/home/ubuntu/.manus/.webdev-state/painel-cozinha-sai/db/data.db'

# Modos de preparo extraídos do documento original
modos_preparo = {
    "(PR) Picles de Cebola Roxa": """1. Fatie as cebolas roxas em rodelas finas.
2. Em uma panela, misture vinagre de maçã (250ml), água (125ml), açúcar (30g) e sal (5g). Leve ao fogo até ferver.
3. Em pote de vidro esterilizado, coloque as cebolas, grãos de pimenta-do-reino e folha de louro.
4. Despeje a mistura fervente sobre as cebolas, garantindo que fiquem submersas.
5. Deixe esfriar, tampe e leve à geladeira. Pronto após 24h.
Validade: 2-3 semanas refrigerado.""",

    "(PR) Picles de Pepino": """1. Lave e fatie os pepinos japoneses em rodelas de espessura média.
2. Em uma panela, misture vinagre de arroz (200ml), água (100ml), açúcar (100g) e sal (15g). Ferva até dissolver.
3. Em pote esterilizado, coloque os pepinos, sementes de mostarda e endro.
4. Despeje a calda fervente sobre os pepinos.
5. Deixe esfriar, tampe e refrigere. Ideal após 48h.
Validade: 3-4 semanas refrigerado.""",

    "(PR) Maionese de Alho e Orégano": """1. Asse a cabeça de alho: corte o topo, regue com azeite, envolva em alumínio e asse a 180°C por 30-40min.
2. Esprema os dentes de alho assados.
3. No processador, bata a maionese base (500g) com o alho assado até homogêneo.
4. Adicione gotas de fumaça líquida se desejar intensificar o sabor defumado.
5. Tempere com sal e pimenta-do-reino a gosto.
6. Transfira para recipiente com tampa e refrigere.
Validade: 3-4 dias refrigerado.""",

    "(PR) Maionese Verde - Coentro e Limão": """1. Lave bem e seque o coentro (1/2 maço).
2. No processador, bata a maionese base (500g) com o coentro, suco de limão caipira (30ml) e raspas de limão.
3. Bata até ficar verde homogêneo e o coentro bem triturado.
4. Tempere com sal e pimenta a gosto.
5. Transfira para recipiente com tampa e refrigere.
Validade: 2-3 dias refrigerado.""",

    "(PR) Maionese Vermelha - Páprica e Calabresa": """1. Em um recipiente, misture a maionese base (500g) com páprica defumada (10g) e pimenta calabresa em flocos (2-4g).
2. Adicione suco de limão (5ml) para equilibrar.
3. Prove e ajuste o sal se necessário.
4. Transfira para recipiente com tampa e refrigere.
5. Para melhor sabor, deixe curtir por algumas horas antes de usar.
Validade: 4-5 dias refrigerado. AVISO: Picante!""",

    "(PR) Mostarda da Casa com Mel": """1. Prepare a mostarda base: misture mostarda amarela (250g), vinagre de maçã (30ml), açúcar mascavo (15g), páprica doce e cúrcuma.
2. Adicione mel de boa qualidade (30g) à mostarda base.
3. Misture bem até incorporar completamente.
4. Prove e ajuste a quantidade de mel conforme doçura desejada.
5. Transfira para bisnaga ou pote com tampa e refrigere.
Validade: 1-2 semanas refrigerado.""",

    "(PR) Mostarda hidratada": """1. Lave os grãos de mostarda (200g) e deixe de molho em água com sal por 24-48h.
2. Escorra e coloque em pote esterilizado com água filtrada, vinagre de maçã (60ml) e sal (15-30g).
3. Deixe fermentar em temperatura ambiente (18-22°C) por 3-7 dias, abrindo diariamente para liberar gás.
4. Quando atingir o sabor desejado, bata no processador até a consistência desejada.
5. Refrigere por 1-2 semanas para maturar os sabores.
Validade: 6 meses refrigerado.""",

    "(PR) Cebola Caramelizada com Rapadura": """1. Aqueça azeite (50ml) em panela grande em fogo médio.
2. Adicione cebola roxa fatiada em julienne (1kg) e refogue por 5-7min até murchar.
3. Reduza o fogo para baixo, adicione sal (5g) e cozinhe por 20-30min, mexendo ocasionalmente.
4. Quando as cebolas estiverem macias e translúcidas, adicione rapadura ralada (200g).
5. Cozinhe por mais 10-15min em fogo baixo, mexendo frequentemente até caramelizar.
6. Finalize com pimenta-do-reino moída na hora.
7. Deixe esfriar e armazene em recipientes herméticos refrigerados.
Validade: 5-7 dias refrigerado.""",

    "(PR) Chutney de Cupuaçu Cachaça e Cebola": """1. Em panela média, reduza a cachaça (200ml) pela metade em fogo médio.
2. Adicione polpa de cupuaçu (500g) e açúcar mascavo (150g). Cozinhe por 5min mexendo.
3. Acrescente vinagre de maçã (50ml), alho (20g) e cebola roxa (500g) picada.
4. Adicione pimenta caiena (5g) e sal (10g).
5. Cozinhe em fogo baixo por 30-40min, mexendo ocasionalmente.
6. Bata com mixer até ficar homogêneo. Ajuste a consistência se necessário.
7. Deixe esfriar e armazene refrigerado.
Validade: 7-10 dias refrigerado. AVISO: Pode conter traços de álcool.""",

    "(PR) Tomate Tomatudo": """1. Faça um "X" na base dos tomates italianos (1kg), mergulhe em água fervente por 30-60s e transfira para água gelada. Remova a pele.
2. Em panela grande, aqueça azeite (30ml) e refogue cebola picada (100g) até translúcida. Adicione alho amassado (4 dentes).
3. Adicione os tomates, caldo de legumes (200ml), vinagre balsâmico (15ml) e açúcar mascavo (5g).
4. Tempere com sal e pimenta. Deixe ferver, reduza o fogo e cozinhe por 1h30-2h.
5. Nos últimos 10min, adicione manjericão fresco.
6. Amasse os tomates para textura rústica ou bata para molho liso.
7. Deixe esfriar e armazene refrigerado.
Validade: 5-7 dias refrigerado. Pode ser congelado.""",

    "(PR) Tomates fermentados": """1. Selecione tomates italianos maduros e firmes. Lave bem.
2. Prepare salmoura: dissolva sal (30g) em água filtrada (1L).
3. Coloque os tomates em pote de vidro esterilizado com alho, manjericão e pimenta-do-reino.
4. Cubra com a salmoura, garantindo que os tomates fiquem submersos.
5. Tampe frouxamente e deixe fermentar em temperatura ambiente por 5-7 dias.
6. Quando atingir acidez desejada, tampe bem e refrigere.
Validade: 2-3 semanas refrigerado.""",

    "(PR) Bacon crocante": """1. Fatie o bacon em tiras de espessura média.
2. Disponha as fatias na chapa fria, sem sobrepor.
3. Ligue a chapa em fogo médio-baixo e cozinhe lentamente.
4. Vire as fatias quando começarem a dourar (aprox. 3-4min).
5. Continue cozinhando até atingir a crocância desejada.
6. Retire e escorra em papel toalha.
7. Use imediatamente ou reserve em local aquecido.
Tempo de preparo: 8-10 minutos.""",

    "(PR) Bacon em Cubos Com Castanha do Pará": """1. Corte o bacon em cubos pequenos (500g) e cozinhe em frigideira em fogo médio-baixo até dourar e ficar crocante.
2. Retire o bacon com escumadeira e reserve. Drene a gordura, deixando 2 colheres de sopa.
3. Adicione açúcar mascavo (100g) e melado de cana (30ml) à gordura. Mexa até formar caramelo claro.
4. Adicione os cubos de bacon e castanha do Pará triturada (150g).
5. Misture rapidamente para envolver tudo no caramelo. Cozinhe por 2-3min.
6. Transfira para assadeira com papel manteiga e espalhe bem.
7. Deixe esfriar completamente antes de armazenar.
Validade: 3-5 dias em temperatura ambiente ou 7-10 dias refrigerado. CONTÉM CASTANHA DO PARÁ.""",

    "(PR) Banha - aproveitamento bacon": """1. Colete a gordura liberada durante o preparo do bacon crocante.
2. Coe a gordura ainda quente através de peneira fina ou pano limpo.
3. Transfira para recipiente de vidro limpo.
4. Deixe esfriar em temperatura ambiente até solidificar.
5. Tampe e armazene refrigerado.
6. Use para selar pães, grelhar hambúrgueres ou preparar outros itens.
Validade: 2-3 semanas refrigerado.""",

    "(PR) Blend 150g": """1. Utilize a proporção definida de cortes (ex: 60% acém, 40% peito bovino).
2. Moa a carne em moedor industrial com disco médio (6-8mm).
3. Tempere levemente com sal e pimenta-do-reino.
4. Pese porções de 150g e modele em formato de disco.
5. Embale individualmente em papel manteiga ou filme.
6. Armazene refrigerado (uso em 24h) ou congele.
Para grelhar: Chapa quente, 3-4min de cada lado para ponto médio.""",

    "(PR) Blend 120g": """1. Utilize a proporção definida de cortes (ex: 60% acém, 40% peito bovino).
2. Moa a carne em moedor industrial com disco médio (6-8mm).
3. Tempere levemente com sal e pimenta-do-reino.
4. Pese porções de 120g e modele em formato de disco.
5. Embale individualmente em papel manteiga ou filme.
6. Armazene refrigerado (uso em 24h) ou congele.
Para grelhar: Chapa quente, 2-3min de cada lado para ponto médio.""",

    "(PR) Coxa/Sobrecoxa de Frango Empanadas": """1. Tempere a sobrecoxa desossada (150g) com sal, pimenta e temperos desejados.
2. Prepare três recipientes: farinha de trigo, ovos batidos e farinha panko.
3. Passe o frango na farinha de trigo, depois nos ovos e por último no panko.
4. Garanta cobertura uniforme em todas as etapas.
5. Frite em óleo a 170-180°C por 6-8min até dourar e cozinhar completamente.
6. Escorra em papel toalha.
7. Adicione queijo prato para derreter com o calor residual.
Tempo de preparo: 8-10 minutos.""",

    "(PR) Coxa/Sobrecoxa Frango Mar. Mostarda/Alho": """1. Prepare a marinada: misture mostarda (100g), alho picado (4 dentes), azeite (30ml), sal e pimenta.
2. Coloque as sobrecoxas desossadas na marinada.
3. Cubra e refrigere por no mínimo 2h, idealmente overnight.
4. Retire da marinada e deixe escorrer o excesso.
5. Grelhe na chapa quente por 5-6min de cada lado até cozinhar completamente.
6. Verifique a temperatura interna (75°C mínimo).
Validade da marinada: usar no mesmo dia.""",

    "(PR) Farinhas Trigo e Flocão Para Empanação": """1. Misture farinha de trigo (500g) com flocão de milho (200g).
2. Adicione temperos secos: sal (10g), páprica (5g), alho em pó (5g) e pimenta-do-reino (2g).
3. Misture bem até homogeneizar.
4. Armazene em recipiente hermético em local seco e fresco.
5. Use para empanar frangos e outros itens.
Validade: 30 dias em local seco."""
}

# Conectar ao banco
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print('Atualizando fichas técnicas de Preparo...\n')

updated = 0
for produto, modo in modos_preparo.items():
    cursor.execute(
        "UPDATE fichas_tecnicas SET modoPreparo = ? WHERE produto LIKE ?",
        (modo, f'%{produto}%')
    )
    if cursor.rowcount > 0:
        print(f'✓ Atualizado: {produto}')
        updated += 1
    else:
        print(f'✗ Não encontrado: {produto}')

conn.commit()
print(f'\nTotal atualizado: {updated} fichas técnicas')

# Verificar fichas atualizadas
cursor.execute("""
    SELECT id, produto 
    FROM fichas_tecnicas 
    WHERE produto LIKE '%(PR)%' AND modoPreparo IS NOT NULL AND modoPreparo != ''
    ORDER BY produto
""")
fichas = cursor.fetchall()
print(f'\nFichas de Preparo com modo de preparo: {len(fichas)}')

conn.close()
