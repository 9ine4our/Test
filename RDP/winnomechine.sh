#!/bin/bash

# Install Cloudflared
wget -O cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 > /dev/null 2>&1
chmod +x cloudflared
mv cloudflared /usr/local/bin/

# Jalankan container Docker
docker run --rm -d --network host --privileged --name nomachine-xfce4 \
  -e PASSWORD=123456 -e USER=user \
  --cap-add=SYS_PTRACE --shm-size=1g \
  thuonghai2711/nomachine-ubuntu-desktop:windows10

# Jalankan Cloudflared tunnel ke port 4000
cloudflared tunnel --url tcp://localhost:4000 > cloudflared.log 2>&1 &

# Tunggu dan ambil URL public Cloudflared
echo "Menunggu Cloudflared memulai tunnel..."
sleep 5

URL=$(grep -oE "tcp://[0-9a-z.-]+:[0-9]+" cloudflared.log | head -n 1)

if [[ -z "$URL" ]]; then
    echo "❌ Cloudflared gagal membuat tunnel. Silakan cek log."
    exit 1
fi

# Info selesai
clear
echo "NoMachine: https://www.nomachine.com/download"
echo "=============================="
echo "🎉 Tunnel aktif di:"
echo "$URL"
echo "=============================="
echo "User: user"
echo "Passwd: 123456"
echo "VM can't connect? Restart Cloud Shell then re-run script."
echo "Press Ctrl+C to stop."
# Animasi dummy agar terminal tetap hidup
seq 1 43200 | while read i; do 
    echo -en "\r Running .     $i s /43200 s"; sleep 0.1
    echo -en "\r Running ..    $i s /43200 s"; sleep 0.1
    echo -en "\r Running ...   $i s /43200 s"; sleep 0.1
    echo -en "\r Running ....  $i s /43200 s"; sleep 0.1
    echo -en "\r Running ..... $i s /43200 s"; sleep 0.1
    echo -en "\r Running     . $i s /43200 s"; sleep 0.1
    echo -en "\r Running  .... $i s /43200 s"; sleep 0.1
    echo -en "\r Running   ... $i s /43200 s"; sleep 0.1
    echo -en "\r Running    .. $i s /43200 s"; sleep 0.1
    echo -en "\r Running     . $i s /43200 s"; sleep 0.1
done
