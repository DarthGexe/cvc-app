FROM node:22

WORKDIR .

# Copiar archivos del proyecto
COPY . .


RUN npm install
RUN npm install shadcn-ui@latest
# Instalar dependencias de Shadcn UI
RUN npm shadcn-ui@latest init
RUN npm shadcn-ui@latest add select button
RUN npm shadcn-ui@latest add dropdown-menu
RUN npm shadcn-ui@latest add select

# Instalar dependencias adicionales
#RUN npm install next-themes lucide-react clsx tailwind-merge recharts


# Construir la aplicación
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "start"]

