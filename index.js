import {ComponentSelectCharacter} from "./components/select-character.js"
import {ComponentSelectArtifact} from "./components/select-artifact.js"

var app = new Vue({
    el: '#app',
    components: {
        'select-character': ComponentSelectCharacter,
        'select-artifact': ComponentSelectArtifact
    },
    data: {
        firstHero: {
            name: '',
            speed: ''
        },
        enemies: {
            first: {},
            second: {},
            third: {},
        },
        report: '',
        darkMode: false
    },
    watch: {
        'firstHero.name': function (val, oldVal) {
            if (val && !this.firstHero.speed) {
                if (localStorage.getItem(val)) {
                    console.log('get localStorage : ' + val);
                    this.firstHero.speed = localStorage.getItem(val);
                }
            } else {
                this.firstHero.speed = '';
            }
        },
        'firstHero.speed': function (val) {
            if (this.firstHero.name && val) {
                console.log('save localStorage : ' + this.firstHero.name + ' ' + val);
                localStorage.setItem(this.firstHero.name, val);
            }
        },
        enemies: {
            deep: true,
            handler(val) {
                this.updateReport();
            }
        },
        darkMode: function (val) {
            this.toggleDarkMode(val);
        }
    },
    methods: {
        updateReport: function () {
            this.report = '';
            this.report += this.updateLine(this.enemies.first);
            this.report += this.updateLine(this.enemies.second);
            this.report += this.updateLine(this.enemies.third);
        },
        updateLine: function (enemy) {
            let content = '';
            if (enemy.name) {
                content += enemy.name;
                content += enemy.artifact ? ' - ' + enemy.artifact : '';
                content += enemy.hp ? ' - ' + this.formatHp(parseInt(enemy.hp)) + ' HP' : '';
                if (enemy.cr && this.firstHero.speed) {
                    let cr = enemy.outspeed === true ? parseInt(enemy.cr) + 100 : enemy.cr;
                    content += ' - ' + Math.round((cr * this.firstHero.speed) / 100) + ' speed';
                }
                content += enemy.counter ? ' - Counter set' : '';
                content += enemy.immunity ? ' - Immunity set' : '';
                content += enemy.infos ? ' - ' + enemy.infos : '';
                content += "\r\n";
            }
            return content;
        },
        formatHp: function (num) {
            return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
        },
        copyToClipboard: function () {
            if ($('#report')) {
                $('#report').select();
                document.execCommand("copy");
            }
        },
        resetForm: function () {
            document.location.reload(true);
        },
        toggleDarkMode: function (val) {
            if (val === true || val === 'true') {
                document.body.classList.add('dark');
                this.darkMode = true;
            } else {
                document.body.classList.remove('dark');
                this.darkMode = false;
            }
            localStorage.setItem('darkMode', val);
        }
    },
    mounted() {
        if (localStorage.getItem('darkMode')) {
            this.toggleDarkMode(localStorage.getItem('darkMode'));
        }
    },
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    })
});