<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Icon Grid Design</title>
<style>
body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    margin: 0;
    padding: 0;
}

.icon-grid-container {
    max-width: 1200px;
    margin: 50px auto;
    background: white;
    padding: 40px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    border-radius: 8px;
}

.icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 30px;
    text-align: center;
}

.icon-item {
    transition: all 0.3s ease;
}

.icon-item img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    transition: transform 0.3s ease;
}

.icon-item span {
    display: block;
    font-size: 0.95rem;
    font-weight: 500;
    color: #333;
}

.icon-item:hover img {
    transform: scale(1.1);
}

.separator {
    grid-column: 1 / -1;
    height: 1px;
    background: #e6e6e6;
}
</style>
</head>
<body>

<div class="icon-grid-container">
    <div class="icon-grid">
        <div class="icon-item">
            <img src="neuro.svg" alt="Neuropsychiatry">
            <span>Neuropsychiatry</span>
        </div>
        <div class="icon-item">
            <img src="cardio.svg" alt="Cardiovascular">
            <span>Cardiovascular Diseases</span>
        </div>
        <div class="icon-item">
            <img src="gastro.svg" alt="Gastroenterology">
            <span>Gastroenterology</span>
        </div>
        <div class="icon-item">
            <img src="pain.svg" alt="Pain">
            <span>Pain and Surgery</span>
        </div>
        <div class="icon-item">
            <img src="eye.svg" alt="Ophthalmology">
            <span>Ophthalmology</span>
        </div>
        <div class="icon-item">
            <img src="lungs.svg" alt="Respiratory">
            <span>Respiratory</span>
        </div>
        <div class="icon-item">
            <img src="gyn.svg" alt="Gynaecology">
            <span>Gynaecology</span>
        </div>

        <div class="separator"></div>

        <div class="icon-item">
            <img src="urology.svg" alt="Urology">
            <span>Urology</span>
        </div>
        <div class="icon-item">
            <img src="onco.svg" alt="Oncology">
            <span>Oncology</span>
        </div>
        <div class="icon-item">
            <img src="derma.svg" alt="Dermatology">
            <span>Dermatology</span>
        </div>
        <div class="icon-item">
            <img src="anti.svg" alt="Anti-infectives">
            <span>Anti-infectives</span>
        </div>
        <div class="icon-item">
            <img src="nephro.svg" alt="Nephrology">
            <span>Nephrology</span>
        </div>
        <div class="icon-item">
            <img src="consumer.svg" alt="Consumer Health Care">
            <span>Consumer Health Care</span>
        </div>
    </div>
</div>

</body>
</html>
