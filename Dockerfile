FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

ENV ASPNETCORE_URLS=http://+:5000;https://+:5001

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["FaceIt2023.csproj", "./"]
RUN dotnet restore "FaceIt2023.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "FaceIt2023.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FaceIt2023.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FaceIt2023.dll"]
