function functionTrojan(config) {
    let buttonHtml = '';
    if (config.type === 'ws') {
        //iklan
        buttonHtml += `<a href="https://www.idwrt.com" style="display: block; text-align: center;">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9mTQ5VtawzRUv5sOLvw8SIjkqbHK9uYjMdX6VOdnw0Ce1wFDNzb508vLXHbAh5Rfv-48j6stloBAZSd2p4IisVv0_on2eRrITBwrj6hkREtBpPomCBtiPhl6jrwXBuzUosryR00mxITTdj0vwP6nkBQrhegfjHCFE5m6ZaAxmfSRxeQpBDblTpBFkzp3v/s728/IDWRT.png" alt="Banner Iklan" style="width: 100%; height: 90px;">
        </a>`;
    
        buttonHtml += `<button id="trojanbuttonws" onclick="trojanws()">Trojan WS</button>`;
    }
    if (config.type === 'grpc') {
        buttonHtml += `<button id="trojanbuttongrpc" onclick="trojangrpc()">Trojan GRPC</button>`;
    }
    document.getElementById('details').innerHTML += buttonHtml;  
    resetResults(); 
}
function trojanws() {
    let subActionsDiv = document.createElement('div');
    subActionsDiv.id = 'subActionsDiv'; 
    subActionsDiv.innerHTML = `
        <button onclick="TrojanSNI()">Mode SNI</button>
        <button onclick="TrojanCDN()">Mode CDN</button>
        <button onclick="TrojanCampuran()">Mode Campuran</button>
        <button onclick="TrojanHostname()">Mode Hostname</button>
        <button onclick="Trojanpath()">Path Costume</button>
    `;
    document.getElementById('details').appendChild(subActionsDiv);
    document.getElementById('trojanbuttonws').remove();
    
    resetResults();  
}
function TrojanSNI() {
    const { protocol, id, add, port, sni, type, host, path } = currentAccountConfig;
    const inputBug = document.getElementById('inputBug1').value;
    const inputBugArray = inputBug.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
    let outputText = '#Trojan WS SNI\nproxies:';
    inputBugArray.forEach((bug, index) => {
        const result = `
- name: Bug-${index + 1}. ${bug}
  server: ${host || add}
  port: ${port}
  type: ${protocol}
  password: ${id}
  skip-cert-verify: true
  sni: ${bug}
  network: ${type}
  ws-opts:
      path: ${path}
      headers:
        Host: ${bug}
  udp: true\n `;
        outputText += result;
    });
    //iklan
    document.getElementById('details').innerHTML = `
    <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
    <button onclick="copyResults()">Copy All</button>
    <a href="https://www.idwrt.com" style="display: block; text-align: center; margin-top: 10px;">
        <img src="path/ke/gambar/banner.jpg" alt="Banner Iklan" style="width: 100%; height: 50px;">
    </a>
`;
}
function TrojanCDN() {
    const { protocol, id, add, port, sni, type, host, path } = currentAccountConfig;
    const inputBug2 = document.getElementById('inputBug2').value;
    const inputBugArray = inputBug2.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
    let outputText = '#Trojan WS CDN (bolak balik)\nproxies:';
    inputBugArray.forEach((bug, index) => {
        const result = `
- name: Bug-${index + 1}. ${bug}
  server: ${bug}
  port: ${port}
  type: ${protocol}
  password: ${id}
  skip-cert-verify: true
  sni: ${host || add}
  network: ${type}
  ws-opts:
      path: ${path}
      headers:
        Host: ${host || add}
  udp: true\n `;
        outputText += result;
    });
    document.getElementById('details').innerHTML = `
        <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
        <button onclick="copyResults()">Copy All</button>
    `;
}
function TrojanCampuran() {
    const { protocol, id, add, port, sni, type, host, path } = currentAccountConfig;
    const inputBug1 = document.getElementById('inputBug1').value;
    const inputBug2 = document.getElementById('inputBug2').value;
    const inputBugArray1 = inputBug1.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
    const inputBugArray2 = inputBug2.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
    let outputText = '#Trojan WS Campuran\nproxies:'; 
    inputBugArray1.forEach((bug, index) => {
        const result = `
- name: Bug-${index + 1}. ${bug} (SNI)
  server: ${host || add}
  port: ${port}
  type: ${protocol}
  password: ${id}
  skip-cert-verify: true
  sni: ${bug}
  network: ${type}
  ws-opts:
      path: ${path}
      headers:
        Host: ${bug}
  udp: true\n `;
        outputText += result;
    });
    inputBugArray2.forEach((bug, index) => {
        const result = `
- name: Bug-${inputBugArray1.length + index + 1}. ${bug} (CDN)
  server: ${bug}
  port: ${port}
  type: ${protocol}
  password: ${id}
  skip-cert-verify: true
  sni: ${host || add}
  network: ${type}
  ws-opts:
      path: ${path}
      headers:
        Host: ${host || add}
  udp: true\n `;
        outputText += result;
    });
    document.getElementById('details').innerHTML = `
        <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
        <button onclick="copyResults()">Copy All</button>
    `;
}
function TrojanHostname() {
    const { protocol, id, add, port, sni, type, host, path } = currentAccountConfig;
    const inputHost1 = document.getElementById('hostname1').value.trim();
    const inputHost2 = document.getElementById('hostname2').value.trim();
    if (!inputHost1 || !inputHost2) {
        alert('Mohon masukkan Hostname 1 dan Hostname 2.');
        return;
    }
    const inputBug = document.getElementById('inputBug1').value.trim();
    const inputBugArray = inputBug.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');

    let outputText = '#Trojan WS Costume Hostname\nproxies:\n';
    inputBugArray.forEach((bug, index) => {
        const result = `
- name: Bug-${index + 1}. ${bug}
  server: ${bug || add}
  port: ${port}
  type: ${protocol}
  password: ${id}
  skip-cert-verify: true
  sni: ${inputHost1}
  network: ${type}
  ws-opts:
      path: ${path}
      headers:
        Host: ${inputHost2 || host}
  udp: true\n`;
        outputText += result;
    });
    document.getElementById('details').innerHTML = `
        <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
        <button onclick="copyResults()">Copy All</button>
    `;
}
function Trojanpath() {
    const { protocol, id, add, port, sni, type, host, path } = currentAccountConfig;
    const inputpathhost = document.getElementById('pathhost').value.trim();
    if (!inputpathhost) {
        alert('Mohon masukkan pathnya.');
        return;
    } 
    const inputBug = document.getElementById('inputBug1').value;
    const inputBugArray = inputBug.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
    let outputText = '#Trojan WS Costume Path\nproxies:';
    inputBugArray.forEach((bug, index) => {
        const result = `
- name: Bug-${index + 1}. ${bug}
  server: ${host || add}
  port: ${port}
  type: ${protocol}
  password: ${id}
  skip-cert-verify: true
  sni: ${bug}
  network: ${type}
  ws-opts:
      path: ${inputpathhost}
      headers:
        Host: ${bug}
  udp: true\n `;
        outputText += result;
    });
    document.getElementById('details').innerHTML = `
        <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
        <button onclick="copyResults()">Copy All</button>
    `;
}
function trojangrpc() {
    let subActionsDiv = document.createElement('div');
    subActionsDiv.id = 'subActionsDiv'; 
    subActionsDiv.innerHTML = `
        <button onclick="grpcSNI()">Mode SNI</button>
        <button onclick="grpcCDN()">Mode CDN</button>
        <button onclick="grpcCampuran()">Mode Campuran</button>
        <button onclick="grpcHostname()">Mode Hostname</button>
    `;
    document.getElementById('details').appendChild(subActionsDiv);
    document.getElementById('trojanbuttongrpc').remove();
    
    resetResults();  
}
function grpcSNI() {
    const { protocol, id, add, port, sni, type, host, path, serviceName } = currentAccountConfig;
        const inputBug1 = document.getElementById('inputBug1').value;
        const inputBugArray1 = inputBug1.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
        let outputText = '#Trojan GRPC SNI\nproxies:';
        inputBugArray1.forEach((bug, index) => {
            const result = `
- name: Bug ${index + 1}. ${bug}
  type: ${protocol}
  server: ${host || add}
  port: ${port}
  password: ${id}
  udp: true
  sni: ${bug}
  skip-cert-verify: true
  network: ${type}
  grpc-opts:
      grpc-service-name: ${serviceName || path}\n `;
            outputText += result;
        });
        document.getElementById('details').innerHTML = `
            <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
            <button onclick="copyResults()">Copy All</button>
        `;
    }
function grpcCDN() {
    const { protocol, id, add, port, sni, type, host, path, serviceName } = currentAccountConfig;
    const inputBug2 = document.getElementById('inputBug2').value;
    const inputBugArray2 = inputBug2.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
        let outputText = '#Trojan GRPC CDN ( Bolak Balik )\nproxies:';
        inputBugArray2.forEach((bug, index) => {
        const result = `
- name: Bug ${index + 1}. ${bug}
  type: ${protocol}
  server: ${bug} 
  port: ${port}
  password: ${id}
  udp: true
  sni: ${host || add}
  skip-cert-verify: true
  network: ${type}
  grpc-opts:
      grpc-service-name: ${serviceName || path}\n `;
            outputText += result;
        });
        document.getElementById('details').innerHTML = `
        <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
        <button onclick="copyResults()">Copy All</button>
        `;
    }
    function grpcCampuran() {
        const { protocol, id, add, port, sni, type, host,serviceName, path } = currentAccountConfig;
        const inputBug1 = document.getElementById('inputBug1').value;
        const inputBug2 = document.getElementById('inputBug2').value;
        const inputBugArray1 = inputBug1.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
        const inputBugArray2 = inputBug2.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
        let outputText = '#Trojan GRPC Campuran\nproxies:';
        inputBugArray1.forEach((bug, index) => {
            outputText += `
- name: Bug-${index + 1}. ${bug} (SNI)
  type: ${protocol}
  server: ${host || add}
  port: ${port}
  password: ${id}
  udp: true
  sni: ${bug}
  skip-cert-verify: true
  network: ${type}
  grpc-opts:
     grpc-service-name: ${serviceName || path}\n `;
        });
        inputBugArray2.forEach((bug, index) => {
            outputText += `
- name: Bug-${inputBugArray1.length + index + 1}. ${bug} (CDN)
  type: ${protocol}
  server: ${bug}
  port: ${port}
  password: ${id}
  udp: true
  sni: ${host || add}
  skip-cert-verify: true
  network: ${type}
  grpc-opts:
      grpc-service-name: ${serviceName || path}\n `;
        });
    
        document.getElementById('details').innerHTML = `
            <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
            <button onclick="copyResults()">Copy All</button>
        `;
    }
    function grpcHostname() {
        const { protocol, id, add, port, sni, type, host, serviceName, path } = currentAccountConfig;
        const inputHost1 = document.getElementById('hostname1').value.trim();
        const inputHost2 = document.getElementById('hostname2').value.trim();
        if (!inputHost1 || !inputHost2) {
            alert('Mohon masukkan Hostname 1 dan Hostname 2.');
            return;
        }
    
        const inputBug = document.getElementById('inputBug1').value.trim();
        const inputBugArray = inputBug.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
        
        let outputText = '#Trojan GRPC Costume Hostname\nproxies:';
    
        inputBugArray.forEach((bug, index) => {
            outputText += `
- name: Bug-${index + 1}. ${bug}
  type: ${protocol}
  server: ${bug}
  port: ${port}
  password: ${id}
  udp: true
  sni: ${inputHost1}
  skip-cert-verify: true
  network: ${type}
  grpc-opts:
      grpc-service-name: ${serviceName || path}\n `;
        });
    
        document.getElementById('details').innerHTML = `
            <textarea id="resultTextarea" style="width: 100%; height: 200px; padding: 5px;">${outputText}</textarea>
            <button onclick="copyResults()">Copy All</button>
        `;
    }
    
