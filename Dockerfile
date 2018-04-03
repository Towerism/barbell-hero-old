FROM microsoft/aspnetcore-build AS builder
WORKDIR /source

COPY . .
RUN dotnet restore
RUN cd BarbellHero && npm install
RUN cd BarbellHero && npm run install
RUN dotnet test BarbellHero.Tests
RUN dotnet publish --output /app/ --configuration Release

FROM microsoft/aspnetcore
WORKDIR /app
COPY --from=builder /app .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet BarbellHero.dll
