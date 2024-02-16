function addNewProduct() {
            const productContainer = document.getElementById("product-container");
            // Criar um novo conjunto de campos para um novo material/ingrediente
            const newProductInfo = document.createElement("div");
            newProductInfo.classList.add("product-info");
            const productFields = `
                <label for="product-name">Nome do material:</label>
                <input type="text" class="product-name"  placeholder="Digite o nome do material">
                <label for="product-value">Valor do material (R$):</label>
                <input type="number" class="product-value" placeholder="Digite o valor do material">
                <label for="product-quantity">Quant. do material:</label>
                <input type="number" class="product-quantity" placeholder="Digite a quantidade do material">
                <select class="product-quantity-unit">
                    <option value="unidades">Unidades (u)</option>
                    <option value="litros">Litros (l)</option>
                    <option value="mililitros">Mililitros (ml)</option>
                    <option value="gramas">Gramas (g)</option>
                    <option value="kg">Quilos (kg)</option>
                    <option value="centimetros">Centímetros (cm)</option>
                    <!-- Nova opção -->
                    <option value="metros">Metros (m)</option>
                    <!-- Nova opção -->
                </select>
                <label for="material-quantity-used">Quant. usada do material:</label>
                <input type="number" class="material-quantity-used" placeholder="Digite a quantidade usada do material">
                <select class="material-quantity-used-unit">
                    <option value="unidades">Unidades (u)</option>
                    <option value="litros">Litros (l)</option>
                    <option value="mililitros">Mililitros (ml)</option>
                    <option value="gramas">Gramas (g)</option>
                    <option value="kg">Quilos (kg)</option>
                    <option value="centimetros">Centímetros (cm)</option>
                    <!-- Nova opção -->
                    <option value="metros">Metros (m)</option>
                    <!-- Nova opção -->
                </select>
            `;
            newProductInfo.innerHTML = productFields;
            productContainer.appendChild(newProductInfo);
        }

        function calculaProdução() {
            const productInfos = document.getElementsByClassName("product-info");
             
            // Array para armazenar os resultados de cada material/ingrediente
            const results = [];
            let totalValue = 0;
            let totalCostPerUnit = 0;

            for (const productInfo of productInfos) {
                const productName = productInfo.querySelector(".product-name").value;
                const productValue = parseFloat(productInfo.querySelector(".product-value").value);
                const productQuantity = parseFloat(productInfo.querySelector(".product-quantity").value);
                const productQuantityUnit = productInfo.querySelector(".product-quantity-unit").value;
                const materialQuantityUsed = parseFloat(productInfo.querySelector(".material-quantity-used").value);
                const materialQuantityUsedUnit = productInfo.querySelector(".material-quantity-used-unit").value;

                // Convertendo as quantidades para a mesma unidade (unidades, litros, mililitros, gramas, kg, centímetros ou metros)
                const convertedProductQuantity = convertToUnits(productQuantity, productQuantityUnit);
                const convertedMaterialQuantityUsed = convertToUnits(materialQuantityUsed, materialQuantityUsedUnit);

                // Calculando a quantidade de unidades a serem produzidas
                const productionQuantity = Math.floor(convertedProductQuantity / convertedMaterialQuantityUsed);

                // Calculando o custo de produção por unidade
                const costPerUnit = productValue / productionQuantity;

                // Adicionando ao valor total de materiais/ingredientes
                totalValue += productValue;

                // Adicionando ao valor total de custo por unidade
                totalCostPerUnit += costPerUnit;

                // Armazenando o resultado para exibir os resultados posteriores
                results.push({
                    productName,
                    productionQuantity,
                    productValue,
                    productQuantity,
                    productQuantityUnit,
                    materialQuantityUsed,
                    materialQuantityUsedUnit,
                    costPerUnit,
                });
            }

            // Resetar estilos antes de verificar novamente
    resetFieldStyles(productInfos);

            // Verificar se todos os campos obrigatórios estão preenchidos
    if (!areFieldsFilled(productInfos)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    function areFieldsFilled(productInfos) {
    let allFieldsFilled = true;

    for (const productInfo of productInfos) {
        const productNameField = productInfo.querySelector(".product-name");
        const productValueField = productInfo.querySelector(".product-value");
        const productQuantityField = productInfo.querySelector(".product-quantity");
        const materialQuantityUsedField = productInfo.querySelector(".material-quantity-used");

        const productName = productNameField.value;
        const productValue = productValueField.value;
        const productQuantity = productQuantityField.value;
        const materialQuantityUsed = materialQuantityUsedField.value;

        // Verificar se algum campo obrigatório não está preenchido
        if (!productName || !productValue || !productQuantity || !materialQuantityUsed) {
            markFieldAsInvalid(productNameField);
            markFieldAsInvalid(productValueField);
            markFieldAsInvalid(productQuantityField);
            markFieldAsInvalid(materialQuantityUsedField);

            allFieldsFilled = false;
        }
    }

    return allFieldsFilled;
}

function markFieldAsInvalid(field) {
    // Adicionar classe para realçar o campo com borda vermelha
    field.classList.add("invalid-field");
}

function resetFieldStyles(productInfos) {
    for (const productInfo of productInfos) {
        const fields = productInfo.querySelectorAll("input");
        
        // Remover a classe 'invalid-field' para resetar os estilos
        fields.forEach(field => field.classList.remove("invalid-field"));
    }
}

            // Calcula a "Sobra de estoque" de cada material e adiciona ao resultado
            for (const result of results) {
                const { productQuantity, productQuantityUnit, materialQuantityUsed, materialQuantityUsedUnit } = result;
                const convertedProductQuantity = convertToUnits(productQuantity, productQuantityUnit);
                const convertedMaterialQuantityUsed = convertToUnits(materialQuantityUsed, materialQuantityUsedUnit);
                const remainingStock = convertedProductQuantity - convertedMaterialQuantityUsed;
                result.remainingStock = remainingStock;
                result.remainingStockUnit = getMatchingUnit(productQuantityUnit, materialQuantityUsedUnit);
            }

            // Exibindo os resultados
            const resultElement = document.getElementById("resultado");
            let resultHTML = `
                <h2>Resultado:</h2>
                <table>
                    <tr>
                        <th>Nome do material</th>
                        <th>Valor do material (R$)</th>
                        <th>Quant. do material</th>
                        <th>Quant. Usada do material</th>
                        <th>Quant. a ser produzido (uni.)</th>
                        <th>Custo de produção por unidade (R$)</th>
                        <th>Sobra de estoque</th>
                    </tr>
            `;

            for (const result of results) {
                resultHTML += `
                    <tr>
                        <td>${result.productName}</td>
                        <td>R$ ${result.productValue.toFixed(2)}</td>
                        <td>${result.productQuantity} ${getUnitAbbreviation(result.productQuantityUnit)}</td>
                        <td>${result.materialQuantityUsed} ${getUnitAbbreviation(result.materialQuantityUsedUnit)}</td>
                        <td>${result.productionQuantity}</td>
                        <td>R$ ${result.costPerUnit.toFixed(2)}</td>
                        <td>${formatSobraDeEstoque(result.remainingStock, result.remainingStockUnit)}</td>
                    </tr>
                `;
            }

            // Calculando o valor total dos materiais/ingredientes
            const totalValueOfMaterials = calculateTotalValueOfMaterials();

            // Calculando o valor total de custo por unidade
            const totalRealValuePerUnit = calculateTotalRealValuePerUnit();

            // Calculando a sobra de capital
            const capitalSurplus = calculateCapitalSurplus();

            // Adicionando o valor total dos materiais/ingredientes ao resultado
            resultHTML += `
                <tr>
                    <th colspan="5">Valor Total dos materiais (R$)</th>
                    <td>R$ ${totalValueOfMaterials.toFixed(2)}</td>
                </tr>
            `;

            // Adicionando o valor total de custo por unidade ao resultado
            resultHTML += `
                <tr>
                    <th colspan="5">Valor real por Unidade (R$)</th>
                    <td>R$ ${totalRealValuePerUnit.toFixed(2)}</td>
                </tr>
            `;

            // Adicionando a sobra de capital ao resultado
            resultHTML += `
                <tr>
                    <th colspan="5">Sobra de Capital (R$)</th>
                    <td>R$ ${capitalSurplus.toFixed(2)}</td>
                </tr>
            `;

            resultHTML += "</table>";
            resultElement.innerHTML = resultHTML;
        }

        function convertToUnits(quantidade, unidade) {
            switch (unidade) {
                case "litros":
                    return quantidade * 1000; // Convertendo para mililitros
                case "mililitros":
                    return quantidade;
                case "gramas":
                    return quantidade * 0.001; // Convertendo para quilogramas
                case "kg":
                    return quantidade; // Já está em quilogramas
                case "centimetros":
                    return quantidade; // já está em centimetros
                case "metros":
                    return quantidade; // Já está em metros
                default:
                    return quantidade; // Unidades, não é necessário converter
            }
        }

        function getUnitAbbreviation(unit) {
            switch (unit) {
                case "unidades":
                    return "uni.";
                case "litros":
                    return "l";
                case "mililitros":
                    return "ml";
                case "gramas":
                    return "g";
                case "kg":
                    return "kg";
                case "centimetros":
                    return "cm";
                case "metros":
                    return "m";
                default:
                    return unit;
            }
        }
        
        function getMatchingUnit(unit1, unit2) {
            if (unit1 === unit2) {
                return unit1;
            } else if (unit1 === "litros" && unit2 === "mililitros") {
                return unit2;
            } else if (unit1 === "mililitros" && unit2 === "litros") {
                return unit1;
            } else if (unit1 === "gramas" && unit2 === "kg") {
                return unit1;
            } else if (unit1 === "kg" && unit2 === "gramas") {
                return unit2;
            } else if (unit1 === "centimetros" && unit2 === "metros") {
                return unit2;
            } else if (unit1 === "metros" && unit2 === "centimetros") {
                return unit1;
            } else {
                return unit1;
            }
        }

        function formatSobraDeEstoque(value, unit) {
            if (unit === "litros") {
                return `${value.toFixed(0)}l`;
            } else if (unit === "mililitros") {
                return `${value.toFixed(0)}ml`;
            } else if (unit === "gramas") {
                return `${(value * 1000).toFixed(0)}g`;
            } else if (unit === "kg") {
                return `${value.toFixed(0)}Kg`;
            } else if (unit === "unidades") {
                return `${value.toFixed(0)} uni.`;
            } else if (unit === "metros") {
                return `${value.toFixed(0)}m`;
            } else if (unit === "centimetros") {
                return `${value.toFixed(0)}cm`;
            } else {
                return value.toFixed(0) + unit;
            }
        }


        function calculateTotalValueOfMaterials() {
            const productInfos = document.getElementsByClassName("product-info");
            let totalValueOfMaterials = 0;
            for (const productInfo of productInfos) {
                const productValue = parseFloat(productInfo.querySelector(".product-value").value);
                totalValueOfMaterials += productValue;
            }
            return totalValueOfMaterials;
        }

        function calculateTotalRealValuePerUnit() {
            const productInfos = document.getElementsByClassName("product-info");
            let totalRealValuePerUnit = 0;
            for (const productInfo of productInfos) {
                const productValue = parseFloat(productInfo.querySelector(".product-value").value);
                const productionQuantity = parseFloat(productInfo.querySelector(".product-quantity").value);
                const productQuantityUnit = productInfo.querySelector(".product-quantity-unit").value;
                const materialQuantityUsed = parseFloat(productInfo.querySelector(".material-quantity-used").value);
                const materialQuantityUsedUnit = productInfo.querySelector(".material-quantity-used-unit").value;

                const convertedProductQuantity = convertToUnits(productionQuantity, productQuantityUnit);
                const convertedMaterialQuantityUsed = convertToUnits(materialQuantityUsed, materialQuantityUsedUnit);

                const costPerUnit = productValue / (convertedProductQuantity / convertedMaterialQuantityUsed);
                totalRealValuePerUnit += costPerUnit;
            }
            return totalRealValuePerUnit;
        }

        function calculateCapitalSurplus() {
            const totalValueOfMaterials = calculateTotalValueOfMaterials();
            const totalRealValuePerUnit = calculateTotalRealValuePerUnit();
            const capitalSurplus = totalValueOfMaterials - totalRealValuePerUnit;
            return capitalSurplus;
        }
