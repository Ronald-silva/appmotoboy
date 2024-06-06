function calculateDistance() {
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [pickup],
            destinations: [dropoff],
            travelMode: 'DRIVING',
        },
        callback
    );
}

function callback(response, status) {
    if (status === 'OK') {
        const origins = response.originAddresses;
        const destinations = response.destinationAddresses;

        for (let i = 0; i < origins.length; i++) {
            const results = response.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
                const element = results[j];
                const distanceText = element.distance.text;
                const distanceValue = element.distance.value / 1000; // Convertendo metros para quilômetros

                // Calcula o preço com base na distância
                const price = distanceValue * 2;

                document.getElementById('distance').textContent = `Distância: ${distanceText}`;
                document.getElementById('price').textContent = `Preço: R$ ${price.toFixed(2)}`;
            }
        }
    } else {
        alert('Erro ao calcular distância. Por favor, tente novamente.');
    }
}
