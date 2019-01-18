module.exports = {
  html: `
  <h2 id="converged-systems-inventory-report">Converged Systems Inventory Report</h2>
<h4 id="system-ss_11_stack5">System: ss_11_stack5</h4>
<h6 id="collection-date-january-17-2019-1103-am-utc">Collection Date: January 17, 2019, 11:03 AM UTC</h6>
<hr />
<h3 id="table-of-contents">Table of Contents</h3>
<ul>
<li>Compute
<ul>
<li>UCS Chassis: chassis-1
<ul>
<li>Chassis-1: Server Blades</li>
<li>Chassis-1: IO Modules</li>
<li>Chassis-1: Power Supply</li>
</ul></li>
</ul></li>
<li>Network
<ul>
<li>Fabric Interconnects</li>
<li>Cisco Nexus Switches</li>
</ul></li>
<li>Storage
<ul>
<li>NetApp Storage Controllers</li>
<li>NetApp Drive Shelves</li>
</ul></li>
<li>Virtualization
<ul>
<li>vCenter</li>
<li>ESXi Hosts</li>
<li>VMware Virtual Machines</li>
</ul></li>
</ul>
<hr />
<h3 id="compute">Compute</h3>
<h4 id="ucs-chassis-chassis-1">UCS Chassis: chassis-1</h4>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Model Number</th>
<th>Serial Number</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>chassis-1</td>
<td>N20-C6508</td>
<td>FOX1523GWLD</td>
</tr>
</tbody>
</table>
<h4 id="chassis-1-server-blades">Chassis-1: Server Blades</h4>
<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
</colgroup>
<thead>
<tr class="header">
<th>Slot Number</th>
<th>Model Number</th>
<th>Serial Number</th>
<th>UCS Firmware</th>
<th>Processor Cores</th>
<th>Processor Speed (GHz)</th>
<th>Memory Size</th>
<th>Memory Speed</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Slot 1</td>
<td>UCSB-B200-M4</td>
<td>FLM1950CKDH</td>
<td>3.1(23d)</td>
<td>24</td>
<td>2.6</td>
<td>384.0 GB</td>
<td>2133</td>
</tr>
<tr class="even">
<td>Slot 2</td>
<td>UCSB-B200-M4</td>
<td>FLM1950CK2X</td>
<td>3.1(23d)</td>
<td>24</td>
<td>2.6</td>
<td>384.0 GB</td>
<td>2133</td>
</tr>
<tr class="odd">
<td>Slot 3</td>
<td>UCSB-B200-M4</td>
<td>FLM2016GH0G</td>
<td>3.1(23d)</td>
<td>28</td>
<td>2.6</td>
<td>256.0 GB</td>
<td>2400</td>
</tr>
<tr class="even">
<td>Slot 4</td>
<td>UCSB-B200-M4</td>
<td>FLM2016GG25</td>
<td>3.1(23d)</td>
<td>28</td>
<td>2.6</td>
<td>256.0 GB</td>
<td>2400</td>
</tr>
</tbody>
</table>
<h4 id="chassis-1-io-modules">Chassis-1: IO Modules</h4>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Model Number</th>
<th>Serial Number</th>
<th>Firmware</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>A</td>
<td>UCS-IOM-2208XP</td>
<td>FCH1612729D</td>
<td>3.1(3h)</td>
</tr>
<tr class="even">
<td>B</td>
<td>UCS-IOM-2208XP</td>
<td>FCH16487DD3</td>
<td>3.1(3h)</td>
</tr>
</tbody>
</table>
<h4 id="chassis-1-power-supply">Chassis-1: Power Supply</h4>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Model Number</th>
<th>Serial Number</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Power Supply 1</td>
<td>N20-PAC5-2500W</td>
<td>DTM1619050C</td>
</tr>
<tr class="even">
<td>Power Supply 2</td>
<td>N20-PAC5-2500W</td>
<td>DTM15290201</td>
</tr>
<tr class="odd">
<td>Power Supply 3</td>
<td>N20-PAC5-2500W</td>
<td>DTM152404UG</td>
</tr>
<tr class="even">
<td>Power Supply 4</td>
<td>N20-PAC5-2500W</td>
<td>DTM1529005Q</td>
</tr>
</tbody>
</table>
<h3 id="network">Network</h3>
<h4 id="fabric-interconnects">Fabric Interconnects</h4>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Model Number</th>
<th>Serial Number</th>
<th>System Version</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>switch-A</td>
<td>UCS-FI-6248UP</td>
<td>SSI174806LQ</td>
<td>5.0(3)N2(3.13h)</td>
</tr>
<tr class="even">
<td>switch-B</td>
<td>UCS-FI-6248UP</td>
<td>SSI161105AW</td>
<td>5.0(3)N2(3.13h)</td>
</tr>
</tbody>
</table>
<h4 id="cisco-nexus-switches">Cisco Nexus Switches</h4>
<table>
<thead>
<tr class="header">
<th>Switch Name</th>
<th>Model Number</th>
<th>Serial Number</th>
<th>Nexus Firmware</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>stack5-9k-1</td>
<td>N9K-C9372PX-E</td>
<td>SAL1950UT6N</td>
<td>7.0(3)I5(2)</td>
</tr>
<tr class="even">
<td>stack5-9k-2</td>
<td>N9K-C9372PX-E</td>
<td>SAL1952W0QW</td>
<td>7.0(3)I5(2)</td>
</tr>
</tbody>
</table>
<h3 id="storage">Storage</h3>
<h4 id="netapp-controllers">NetApp Controllers</h4>
<table>
<thead>
<tr class="header">
<th>Node Name</th>
<th>Model Number</th>
<th>Serial Number</th>
<th>NetApp Firmware</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>backup-01</td>
<td>AFF-A300</td>
<td>721652000176</td>
<td>9.2</td>
</tr>
<tr class="even">
<td>backup-02</td>
<td>AFF-A300</td>
<td>721652000175</td>
<td>9.2</td>
</tr>
</tbody>
</table>
<h4 id="netapp-drive-shelves">NetApp Drive Shelves</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
</colgroup>
<thead>
<tr class="header">
<th>Shelf ID</th>
<th>Model Number</th>
<th>Disk Model Number</th>
<th>Disk Serial Number</th>
<th>Disk Firmware</th>
<th>Disk Speed</th>
<th>Disk Type</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>0</td>
<td>DS224-12</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB05668</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB05861</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB08932</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB10795</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB10797</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB10945</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11002</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11556</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11561</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11562</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11585</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11589</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11598</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11618</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11622</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB11762</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB12712</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB12847</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB12988</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB13063</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB13130</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB13134</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB13170</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td>X371_S163A960ATE</td>
<td>S396NA0HB13383</td>
<td>NA51</td>
<td>N/A</td>
<td>SSD</td>
</tr>
</tbody>
</table>
<h3 id="virtualization">Virtualization</h3>
<h4 id="vcenter">vCenter</h4>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Version/Build</th>
<th>Total Hosts</th>
<th>Total VMs</th>
<th>Total CPU</th>
<th>Total Memory</th>
<th>Total Storage</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>stack5-vc</td>
<td>6.5.0/7119157</td>
<td>2</td>
<td>30</td>
<td>124512</td>
<td>767.8 GB</td>
<td>1.2 TB</td>
</tr>
</tbody>
</table>
<h4 id="esxi-hosts">ESXi Hosts</h4>
<table style="width:100%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
</colgroup>
<thead>
<tr class="header">
<th>Host Name</th>
<th>Version/Build</th>
<th>Number of VMs</th>
<th>Status</th>
<th>Compute Serial Number</th>
<th>DataCenter</th>
<th>Cluster</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>10.61.186.201</td>
<td>6.5 (Update 1)/7388607</td>
<td>24</td>
<td>yellow</td>
<td>N/A</td>
<td>stack5</td>
<td>stack5-cluster</td>
</tr>
<tr class="even">
<td>10.61.186.202</td>
<td>6.5 (Update 1)/7388607</td>
<td>6</td>
<td>green</td>
<td>N/A</td>
<td>stack5</td>
<td>stack5-cluster</td>
</tr>
</tbody>
</table>
<h4 id="vmware-virtual-machines">VMware Virtual Machines</h4>
<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>OS Type</th>
<th>OS Version</th>
<th>ESXi Host</th>
<th>Compute Serial Number</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>1926NasLocalDS</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>%2fvmfs%2fvolumes%2ff98a6554-28892123%2fconverged_systems_advisor_agent_3.1%2fco</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>Automation_Agent</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>Automation_Team_CSA 3.0 Agent1</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.202</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>Automation_Team_CSA 3.0 Agent2</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>CIDASH-2794 test</td>
<td>N/A</td>
<td>Microsoft Windows Server 2012 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>CSA 3.0 Agent 20180703.1114 for CSA-33</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>CSA 3.0 Agent 20180703.1114-Sachin</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>CSA 3.0 Agent_34_QA</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.202</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>CSA 3.0 Agent_35_QA</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>CSA Agent 3.0 21180612.1223_for_CSA_30</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>CSA-3.0-Agent-Production-New</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>CSA-3.0-Agent-Production-Old</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>CSA-Agent-301-Production</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>CSA_3_Agent_20180703.1114_for_33_GUI_QA2</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>CSA_3_Agent_20180703.1114_for_CSA_31_GUI_QA1</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>CSA_3_Agent_20180703.1114_for_CSA_33_GUI_QA1</td>
<td>N/A</td>
<td>Debian GNU/Linux 9 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>HPE_OneView_3.10_ESXi_Z7550-96338</td>
<td>N/A</td>
<td>Other 2.6.x Linux (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>JumpVM-2</td>
<td>N/A</td>
<td>Microsoft Windows Server 2012 (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>SS2453</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>SStest1_rename2449</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>Stack5-vCenter</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>converged-systems-advisor-agent.3.0-devZ</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.202</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>converged_systems_advisor_agent_3.1 Deploy Test 2 MW</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>csa-agent.3.0-gsamaiya</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.202</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>ss_513</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.202</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>ss_514</td>
<td>N/A</td>
<td>N/A</td>
<td>10.61.186.202</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>stack5-vsc</td>
<td>N/A</td>
<td>Other 3.x or later Linux (64-bit)</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="odd">
<td>vESXi-1-10.61.186.4</td>
<td>N/A</td>
<td>VMware ESXi 6.5</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
<tr class="even">
<td>vESXi-2-10.61.186.5</td>
<td>N/A</td>
<td>VMware ESXi 6.5</td>
<td>10.61.186.201</td>
<td>N/A</td>
</tr>
</tbody>
</table>
`
}