class LTACard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            const card = document.createElement('ha-card');

            // Card Header
            if(this.config.header) { card.header = this.config.header; }
            else { card.header = 'Next Buses'; }

            this.content = document.createElement('div');
            this.content.style.padding = '0 16px 16px';
            card.appendChild(this.content);
            const style = document.createElement('style');
            style.textContent = `
                .bus_times {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-gap: 5px;
                    width: 100%;
                    margin-bottom: 25px;
                }
                .bus_time{
                    grid-column: span 3;
                    text-align: center;
                    margin-top: 4px;
                }

                .bus_late{
                    color:#ffa050;
                }

                .bus_time_name, .bus_time_value{
                    font-size: var(--ha-card-header-font-size, 24px);
                }

                .bus_time_value{
                    display:inline-flex;
                }
            `;
            this.appendChild(style);
            this.appendChild(card);
        }


        var tmpcontent = "";
        var tmpBusArr = "";
        var tmpBusName = "";
        var threshold = this.config.threshold;
        var class_late = "";
        var bus_type = "";

        this.config.group.forEach(function (item, index) {
            tmpBusName = item["name"];
            tmpBusArr = "";

            item["entities"].forEach(function (item, index) {
                if (hass.states[item["entity"]]) {
                    class_late = hass.states[item["entity"]].state < threshold ? "bus_late" : "";
                    bus_type = hass.states[item["entity"]].attributes.type == "DD" ? "mdi:bus-double-decker":"mdi:bus-side";

                    tmpBusArr = tmpBusArr + `
                      <div class="bus_time"><div class="bus_time_value ${class_late}">${hass.states[item["entity"]].state}</div> ${hass.states[item["entity"]].attributes.unit_of_measurement} <ha-icon icon="${bus_type}"></ha-icon></div>
                    `;
                }
            });

            tmpcontent = tmpcontent + `
            <div class="bus_times">
              <div class="bus_time bus_time_name">${tmpBusName}</div>
              ${tmpBusArr}
            </div>
            `;
        });


        this.content.innerHTML = tmpcontent;
    }

    setConfig(config) {
        if (!config.group) {
            throw new Error("You need to define entities");
        }
        this.config = config;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 3;
    }

}
  
customElements.define('lta-card', LTACard);

/*
cards:
  - type: :"custom:lta-card"
    header: "Bus Stop Name"
    threshold: 10
    group:
      - name: "serviceA"
        entities:
          - entity: sensor.lta_xxxxx_xxx_1
          - entity: sensor.lta_xxxxx_xxx_2
      - name: "serviceB"
        entities:
          - entity: sensor.lta_yyyyy_yyy_1
          - entity: sensor.lta_yyyyy_yyy_2

*/