// --- GAME ENGINE STATE ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_STATE = {
    isRunning: false,
    isShopOpen: false,
    coins: 0,
    wave: 1,
    gravity: 0.4, // Slower gravity for normal pacing
    groundY: 526,
    keys: {},
    particles: [],
    projectiles: [],
    screenShake: 0,
    time: 0
};

// --- STICKMAN RENDERER ---
function drawStickman(ctx, entity) {
    const { x, y, width, height, facingRight, state, color, attackCooldown } = entity;
    const cx = x + width / 2;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Head
    ctx.beginPath();
    ctx.arc(cx, y + 15, 12, 0, Math.PI * 2);
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.moveTo(cx, y + 27);
    ctx.lineTo(cx, y + 65);
    ctx.stroke();

    // Legs
    let legSwing = 0;
    if (state === 'walking') legSwing = Math.sin(GAME_STATE.time * 0.2) * 15;
    
    ctx.beginPath();
    ctx.moveTo(cx, y + 65);
    ctx.lineTo(cx - 15 + legSwing, y + 100);
    ctx.moveTo(cx, y + 65);
    ctx.lineTo(cx + 15 - legSwing, y + 100);
    ctx.stroke();

    // Arms
    let armSwing = 0;
    if (state === 'walking') armSwing = Math.sin(GAME_STATE.time * 0.2) * 15;

    ctx.beginPath();
    
    if (state === 'attacking') {
        // Attack pose
        let attackExtend = attackCooldown > 15 ? 30 : 0;
        if (facingRight) {
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx + 30 + attackExtend, y + 35);
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx - 15, y + 50);
        } else {
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx - 30 - attackExtend, y + 35);
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx + 15, y + 50);
        }
    } else {
        // Idle/Walk pose
        if (facingRight) {
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx - 15 - armSwing, y + 55);
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx + 15 + armSwing, y + 55);
        } else {
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx + 15 + armSwing, y + 55);
            ctx.moveTo(cx, y + 35);
            ctx.lineTo(cx - 15 - armSwing, y + 55);
        }
    }
    ctx.stroke();

    // Draw Weapon (if attacking)
    if (state === 'attacking') {
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 3;
        ctx.beginPath();
        let weaponX = facingRight ? cx + 30 + (attackCooldown > 15 ? 30 : 0) : cx - 30 - (attackCooldown > 15 ? 30 : 0);
        ctx.moveTo(weaponX, y + 35);
        ctx.lineTo(weaponX + (facingRight ? 20 : -20), y + 35);
        ctx.stroke();
    }
}

// --- ENTITY CLASS ---
class Entity {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.hp = 100;
        this.maxHp = 100;
        this.mana = 100;
        this.maxMana = 100;
        this.speed = 3; // Slower base speed
        this.jumpPower = -10; // Lower jump
        this.isGrounded = false;
        this.facingRight = true;
        this.attackCooldown = 0;
        this.hitCooldown = 0;
        this.state = 'idle';
    }

    update() {
        // Physics
        this.vy += GAME_STATE.gravity;
        this.y += this.vy;
        this.x += this.vx;

        // Ground Collision
        if (this.y + this.height >= GAME_STATE.groundY) {
            this.y = GAME_STATE.groundY - this.height;
            this.vy = 0;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }

        // Wall Collision
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;

        // Cooldowns
        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.hitCooldown > 0) this.hitCooldown--;
        
        // State Reset
        if (this.attackCooldown === 0 && this.state === 'attacking') this.state = 'idle';
    }

    takeDamage(amount, knockbackDir) {
        if (this.hitCooldown > 0 || this.hp <= 0) return;
        this.hp -= amount;
        this.hitCooldown = 30; // Longer invincibility frames
        this.state = 'hurt';
        GAME_STATE.screenShake = 8;
        
        // Knockback
        this.vx = knockbackDir * 8;
        setTimeout(() => this.vx = 0, 150);

        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
        updateUI();
    }

    die() {
        createParticles(this.x + this.width/2, this.y + this.height/2, this.color, 30);
    }
}

// --- PLAYER CLASS ---
class Player extends Entity {
    constructor() {
        super(200, 400, 50, 100, '#8e44ad');
        this.baseDamage = 10;
        this.godMode = false;
        this.trail = [];
        this.isDashing = false;
    }

    update() {
        if (GAME_STATE.isShopOpen) return;

        // Dash Trail
        if (this.isDashing) {
            this.trail.push({x: this.x, y: this.y, alpha: 1});
            if (this.trail.length > 5) this.trail.shift();
        } else {
            if (this.trail.length > 0) this.trail.shift();
        }

        // Movement
        if (!this.isDashing) {
            if (GAME_STATE.keys['a']) {
                this.vx = -this.speed;
                this.facingRight = false;
                if (this.state !== 'attacking') this.state = 'walking';
            } else if (GAME_STATE.keys['d']) {
                this.vx = this.speed;
                this.facingRight = true;
                if (this.state !== 'attacking') this.state = 'walking';
            } else {
                this.vx = 0;
                if (this.state !== 'attacking') this.state = 'idle';
            }
        }

        // Jump
        if (GAME_STATE.keys['w'] && this.isGrounded && !this.isDashing) {
            this.vy = this.jumpPower;
        }

        // --- POWERS ---
        // Basic Attack (J)
        if (GAME_STATE.keys['j'] && this.attackCooldown <= 0) {
            this.attack();
        }

        // Shadow Blast (K)
        if (GAME_STATE.keys['k'] && this.mana >= 20 && this.attackCooldown <= 0) {
            this.shadowBlast();
        }

        // Teleport Dash (L) - Anime Speed
        if (GAME_STATE.keys['l'] && this.mana >= 15 && !this.isDashing && this.attackCooldown <= 0) {
            this.teleportDash();
        }

        // Energy Orb (U) - Rasengan Style
        if (GAME_STATE.keys['u'] && this.mana >= 50 && this.attackCooldown <= 0) {
            this.energyOrb();
        }

        // Domain Expansion (I) - Anime OP Ultimate
        if (GAME_STATE.keys['i'] && this.mana >= 100 && this.attackCooldown <= 0) {
            this.domainExpansion();
        }

        // Mana Regen
        if (this.mana < this.maxMana) {
            this.mana += 0.15;
            if (this.mana > this.maxMana) this.mana = this.maxMana;
            updateUI();
        }

        super.update();
    }

    attack() {
        this.state = 'attacking';
        this.attackCooldown = 35; // Slower attack
        
        let hitboxX = this.facingRight ? this.x + this.width : this.x - 60;
        let hitbox = { x: hitboxX, y: this.y, w: 60, h: this.height };

        if (checkCollision(hitbox, enemy)) {
            enemy.takeDamage(this.baseDamage, this.facingRight ? 1 : -1);
            createParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2, '#f1c40f', 10);
        }
    }

    shadowBlast() {
        this.mana -= 20;
        this.attackCooldown = 45;
        updateUI();
        
        GAME_STATE.projectiles.push({
            x: this.x + (this.facingRight ? this.width : -30),
            y: this.y + 30,
            w: 25, h: 25,
            vx: this.facingRight ? 12 : -12,
            damage: this.baseDamage * 1.5,
            color: '#3498db',
            type: 'blast'
        });
    }

    teleportDash() {
        this.mana -= 15;
        this.attackCooldown = 40;
        this.isDashing = true;
        this.hitCooldown = 20; // Invincible during dash
        updateUI();

        let dashDistance = this.facingRight ? 200 : -200;
        let startX = this.x;
        let duration = 200; // ms
        let startTime = performance.now();

        let animateDash = (time) => {
            let elapsed = time - startTime;
            let progress = Math.min(elapsed / duration, 1);
            this.x = startX + (dashDistance * progress);
            
            if (progress < 1) {
                requestAnimationFrame(animateDash);
            } else {
                this.isDashing = false;
            }
        };
        requestAnimationFrame(animateDash);
        
        createParticles(this.x + this.width/2, this.y + this.height/2, '#8e44ad', 15);
    }

    energyOrb() {
        this.mana -= 50;
        this.attackCooldown = 60;
        updateUI();
        
        GAME_STATE.projectiles.push({
            x: this.x + (this.facingRight ? this.width : -50),
            y: this.y + 20,
            w: 50, h: 50,
            vx: this.facingRight ? 8 : -8,
            damage: this.baseDamage * 3,
            color: '#00ffff',
            type: 'orb',
            life: 100
        });
    }

    domainExpansion() {
        this.mana = 0;
        this.attackCooldown = 120;
        GAME_STATE.screenShake = 40;
        updateUI();
        
        // Anime OP: Freeze enemy and deal massive damage over time
        enemy.vx = 0;
        enemy.vy = 0;
        enemy.hitCooldown = 100; // Stun
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2, '#e74c3c', 20);
                if (enemy.hp > 0 && !enemy.isDead) {
                    enemy.hp -= this.baseDamage * 0.8;
                    if (enemy.hp <= 0) enemy.die();
                }
                updateUI();
            }, i * 100);
        }
    }
}

// --- ENEMY CLASS (AI) ---
class Demon extends Entity {
    constructor(wave) {
        super(800, 400, 50, 100, '#c0392b');
        this.maxHp = 80 + (wave * 30);
        this.hp = this.maxHp;
        this.baseDamage = 8 + (wave * 2);
        this.speed = 2 + (wave * 0.3);
        this.aiTimer = 0;
        this.isDead = false;
        this.type = wave % 3 === 0 ? 'Brute' : (wave % 3 === 1 ? 'Assassin' : 'Mage');
        
        if (this.type === 'Brute') {
            this.color = '#8e44ad';
            this.maxHp *= 1.5;
            this.hp = this.maxHp;
            this.speed *= 0.7;
            this.width = 60;
            this.height = 110;
        } else if (this.type === 'Assassin') {
            this.color = '#e67e22';
            this.speed *= 1.4;
            this.baseDamage *= 0.8;
        } else if (this.type === 'Mage') {
            this.color = '#2980b9';
            this.baseDamage *= 1.5;
        }
    }

    update() {
        if (GAME_STATE.isShopOpen || this.isDead || this.hitCooldown > 50) return; // Stunned

        // AI Logic
        let distance = player.x - this.x;
        
        if (Math.abs(distance) > 70) {
            this.vx = distance > 0 ? this.speed : -this.speed;
            this.facingRight = distance > 0;
            this.state = 'walking';
        } else {
            this.vx = 0;
            this.state = 'idle';
            if (this.attackCooldown <= 0) {
                this.attack();
            }
        }

        // Mage Ranged Attack
        if (this.type === 'Mage' && Math.abs(distance) > 250 && this.attackCooldown <= 0) {
            this.rangedAttack();
        }

        // Random Jump
        this.aiTimer++;
        if (this.aiTimer > 120) {
            if (this.isGrounded && Math.random() > 0.8) {
                this.vy = this.jumpPower;
            }
            this.aiTimer = 0;
        }

        super.update();
    }

    attack() {
        this.state = 'attacking';
        this.attackCooldown = this.type === 'Assassin' ? 40 : 70;
        
        let hitboxX = this.facingRight ? this.x + this.width : this.x - 60;
        let hitbox = { x: hitboxX, y: this.y, w: 60, h: this.height };

        if (checkCollision(hitbox, player)) {
            player.takeDamage(this.baseDamage, this.facingRight ? 1 : -1);
            createParticles(player.x + player.width/2, player.y + player.height/2, '#e74c3c', 15);
        }
    }

    rangedAttack() {
        this.attackCooldown = 90;
        GAME_STATE.projectiles.push({
            x: this.x + (this.facingRight ? this.width : -30),
            y: this.y + 30,
            w: 20, h: 20,
            vx: this.facingRight ? 10 : -10,
            damage: this.baseDamage,
            color: '#e74c3c',
            type: 'blast'
        });
    }

    die() {
        this.isDead = true;
        super.die();
        GAME_STATE.coins += 50 + (GAME_STATE.wave * 10);
        updateUI();
        
        setTimeout(() => {
            GAME_STATE.wave++;
            spawnEnemy();
        }, 1500);
    }
}

// --- HELPER FUNCTIONS ---
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.w > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.h > rect2.y;
}

function createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        GAME_STATE.particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            life: 40,
            maxLife: 40,
            color: color,
            size: Math.random() * 5 + 2
        });
    }
}

// --- GAME SETUP & LOOP ---
let player;
let enemy;

function startGame() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-wrapper').classList.remove('hidden');
    GAME_STATE.isRunning = true;
    player = new Player();
    spawnEnemy();
    updateUI();
    gameLoop();
}

function spawnEnemy() {
    enemy = new Demon(GAME_STATE.wave);
    document.getElementById('enemy-name').innerText = enemy.type + " Demon (Wave " + GAME_STATE.wave + ")";
    updateUI();
}

function updateUI() {
    if (!player || !enemy) return;
    
    document.getElementById('player-hp').style.width = Math.max(0, (player.hp / player.maxHp * 100)) + '%';
    document.getElementById('player-mana').style.width = Math.max(0, (player.mana / player.maxMana * 100)) + '%';
    document.getElementById('enemy-hp').style.width = Math.max(0, (enemy.hp / enemy.maxHp * 100)) + '%';
    
    document.getElementById('coins').innerText = GAME_STATE.coins;
    document.getElementById('shop-coins').innerText = GAME_STATE.coins;
    document.getElementById('wave-display').innerText = "Wave " + GAME_STATE.wave;
    document.getElementById('stat-dmg').innerText = player.baseDamage;
    document.getElementById('stat-spd').innerText = player.speed;
}

function gameLoop() {
    if (!GAME_STATE.isRunning) return;
    GAME_STATE.time++;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Screen Shake
    ctx.save();
    if (GAME_STATE.screenShake > 0) {
        let sx = (Math.random() - 0.5) * GAME_STATE.screenShake;
        let sy = (Math.random() - 0.5) * GAME_STATE.screenShake;
        ctx.translate(sx, sy);
        GAME_STATE.screenShake *= 0.9;
        if (GAME_STATE.screenShake < 0.5) GAME_STATE.screenShake = 0;
    }

    // Draw Background Grid (Stickman aesthetic)
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }
    
    // Draw Ground
    ctx.fillStyle = '#111';
    ctx.fillRect(0, GAME_STATE.groundY, canvas.width, canvas.height - GAME_STATE.groundY);
    
    // Draw Moon
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(800, 150, 80, 0, Math.PI * 2);
    ctx.fill();

    if (!GAME_STATE.isShopOpen) {
        player.update();
        enemy.update();

        // Update Projectiles
        for (let i = GAME_STATE.projectiles.length - 1; i >= 0; i--) {
            let p = GAME_STATE.projectiles[i];
            p.x += p.vx;
            if (p.type === 'orb') p.life--;
            
            let hitbox = { x: p.x, y: p.y, w: p.w, h: p.h };
            
            if (p.vx > 0 && checkCollision(hitbox, enemy) && !enemy.isDead) {
                enemy.takeDamage(p.damage, 1);
                createParticles(p.x, p.y, p.color, 15);
                GAME_STATE.projectiles.splice(i, 1);
            } else if (p.vx < 0 && checkCollision(hitbox, player)) {
                player.takeDamage(p.damage, -1);
                createParticles(p.x, p.y, p.color, 15);
                GAME_STATE.projectiles.splice(i, 1);
            } else if (p.x < 0 || p.x > canvas.width || (p.type === 'orb' && p.life <= 0)) {
                GAME_STATE.projectiles.splice(i, 1);
            }
        }

        // Update Particles
        for (let i = GAME_STATE.particles.length - 1; i >= 0; i--) {
            let p = GAME_STATE.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15;
            p.life--;
            if (p.life <= 0) GAME_STATE.particles.splice(i, 1);
        }

        if (player.hp <= 0) {
            GAME_STATE.isRunning = false;
            alert("You have been defeated! Refresh the page to try again.");
        }
    }

    // Draw Player Trail
    player.trail.forEach((t, index) => {
        ctx.globalAlpha = index / player.trail.length * 0.5;
        drawStickman(ctx, {...player, x: t.x, y: t.y, color: '#8e44ad'});
        ctx.globalAlpha = 1;
    });

    // Draw Entities
    drawStickman(ctx, player);
    drawStickman(ctx, enemy);

    // Draw Projectiles
    GAME_STATE.projectiles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        if (p.type === 'orb') {
            ctx.beginPath();
            ctx.arc(p.x + p.w/2, p.y + p.h/2, p.w/2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(p.x, p.y, p.w, p.h);
        }
        ctx.shadowBlur = 0;
    });

    // Draw Particles
    GAME_STATE.particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;
    });

    ctx.restore();
    requestAnimationFrame(gameLoop);
}

// --- INPUT HANDLING ---
window.addEventListener('keydown', (e) => {
    GAME_STATE.keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === 'e' && GAME_STATE.isRunning) toggleShop();
});

window.addEventListener('keyup', (e) => {
    GAME_STATE.keys[e.key.toLowerCase()] = false;
});

// --- SHOP SYSTEM ---
function toggleShop() {
    GAME_STATE.isShopOpen = !GAME_STATE.isShopOpen;
    document.getElementById('shop-overlay').classList.toggle('hidden');
}

function buyItem(type) {
    if (GAME_STATE.coins >= 100) {
        GAME_STATE.coins -= 100;
        if (type === 'damage') player.baseDamage += 5;
        if (type === 'health') { player.maxHp += 50; player.hp = player.maxHp; }
        if (type === 'mana') player.maxMana += 50;
        if (type === 'speed') player.speed += 1;
        updateUI();
    } else {
        alert("Not enough coins! Defeat more demons.");
    }
}

// --- ADMIN COMMANDS ---
function runAdminCommand() {
    let input = document.getElementById('admin-input').value.toLowerCase().trim();
    let args = input.split(" ");
    let output = document.getElementById('console-output');

    if (input === "") return;
    output.innerHTML = "> " + input;

    if (input === "/help") {
        output.innerHTML += "<br>Commands: /god, /win, /heal, /coins [amt], /spawn [wave], /maxstats, /onepunch";
    }
    else if (input === "/god") {
        player.godMode = !player.godMode;
        output.innerHTML += `<br>God Mode: ${player.godMode ? "ON" : "OFF"}`;
    } 
    else if (input === "/win") {
        if (enemy && !enemy.isDead) {
            enemy.takeDamage(99999, 1);
            output.innerHTML += "<br>Enemy defeated.";
        }
    } 
    else if (input === "/heal") {
        player.hp = player.maxHp;
        player.mana = player.maxMana;
        updateUI();
        output.innerHTML += "<br>Healed to full.";
    } 
    else if (args[0] === "/coins") {
        let amount = parseInt(args[1]);
        if (!isNaN(amount)) {
            GAME_STATE.coins += amount;
            updateUI();
            output.innerHTML += `<br>Added ${amount} coins.`;
        } else {
            output.innerHTML += "<br>Usage: /coins 9999";
        }
    } 
    else if (args[0] === "/spawn") {
        let wave = parseInt(args[1]);
        if (!isNaN(wave)) {
            GAME_STATE.wave = wave;
            spawnEnemy();
            output.innerHTML += `<br>Spawned Wave ${wave}.`;
        } else {
            output.innerHTML += "<br>Usage: /spawn 5";
        }
    }
    else if (input === "/maxstats") {
        player.baseDamage = 9999;
        player.maxHp = 99999;
        player.hp = 99999;
        player.maxMana = 99999;
        player.mana = 99999;
        player.speed = 15;
        updateUI();
        output.innerHTML += "<br>Max stats applied.";
    }
    else if (input === "/onepunch") {
        player.baseDamage = 999999;
        updateUI();
        output.innerHTML += "<br>One Punch Mode activated.";
    }
    else {
        output.innerHTML += "<br>Unknown command. Type /help";
    }
    
    document.getElementById('admin-input').value = "";
    output.scrollTop = output.scrollHeight;
}