---
name: gr-course-conventions
description: Applies the user's GR course conventions to calculations in special relativity, general relativity, relativistic mechanics, and relativistic field theory. Use whenever solving or checking problems involving four-vectors, four-momentum, Lorentz invariants, the d'Alembertian, Klein-Gordon fields, plane waves, or related relativistic calculations.
---

# GR Course Conventions

Apply the following conventions consistently throughout each solution. Prefer them over alternative textbook conventions unless the problem explicitly specifies incompatible conventions; in that case, identify the conflict before proceeding rather than silently changing conventions.

## Start Every Solution

State near the beginning that the metric signature is

\[
g_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1).
\]

Keep \(c\) and \(\hbar\) explicit unless the user or problem explicitly requests natural units. If using natural units, say explicitly that \(c=1\) and/or \(\hbar=1\).

## Coordinates and Indices

- Write spacetime coordinates as \(x^\mu=(ct,x,y,z)\).
- Use Greek indices such as \(\mu,\nu,\alpha,\beta\) for spacetime indices.
- Use
  \[
  \partial_\mu=\left(\frac{1}{c}\frac{\partial}{\partial t},\boldsymbol{\nabla}\right),
  \]
  and raise or lower indices with the \((+,-,-,-)\) metric.
- Keep index placement explicit and show index lowering whenever it changes a sign.

## Four-Momentum and Mass Shell

Use

\[
p^\mu=\left(\frac{E}{c},\mathbf p\right),
\qquad
p_\mu=\left(\frac{E}{c},-\mathbf p\right).
\]

Whenever relevant, explicitly verify the Lorentz invariant:

\[
p^\mu p_\mu=\left(\frac{E}{c}\right)^2-\mathbf p^2.
\]

For a massive particle impose

\[
p^\mu p_\mu=m^2c^2,
\]

so that

\[
\frac{E^2}{c^2}-p^2=m^2c^2,
\qquad
E^2=p^2c^2+m^2c^4.
\]

Never write \(p^\mu p_\mu=-m^2c^2\) under these conventions.

## d'Alembertian and Klein-Gordon Equation

Define

\[
\Box=g^{\mu\nu}\partial_\mu\partial_\nu
=\frac{1}{c^2}\frac{\partial^2}{\partial t^2}-\nabla^2.
\]

Check signs explicitly when expanding \(\Box\). Write the free Klein-Gordon equation as

\[
\left(\Box+\frac{m^2c^2}{\hbar^2}\right)\phi=0,
\]

or, after expansion,

\[
\left[
\frac{1}{c^2}\frac{\partial^2}{\partial t^2}
-\nabla^2
+\frac{m^2c^2}{\hbar^2}
\right]\phi=0.
\]

## Plane Waves and Sign Check

Use

\[
\phi(x)=A\exp\!\left[-\frac{i}{\hbar}
\left(Et-\mathbf p\cdot\mathbf x\right)\right]
=A e^{-ip_\mu x^\mu/\hbar},
\]

because

\[
p_\mu x^\mu=Et-\mathbf p\cdot\mathbf x.
\]

When substituting a plane wave into a field equation, show enough differentiation and algebra to audit every sign. In particular, calculate

\[
\frac{\partial^2\phi}{\partial t^2}
=-\frac{E^2}{\hbar^2}\phi,
\qquad
\nabla^2\phi=-\frac{p^2}{\hbar^2}\phi,
\]

and therefore

\[
\Box\phi=\left(-\frac{E^2}{\hbar^2c^2}
+\frac{p^2}{\hbar^2}\right)\phi.
\]

Substitution into the Klein-Gordon equation must yield

\[
-\frac{E^2}{c^2}+p^2+m^2c^2=0,
\]

and hence

\[
E^2=p^2c^2+m^2c^4.
\]

## Final Consistency Check

Before completing a calculation:

1. Confirm that the \((+,-,-,-)\) signature was stated and used throughout.
2. Confirm that raised and lowered components have the correct signs.
3. Verify each important Lorentz invariant explicitly.
4. Recheck the temporal and spatial signs in every expansion of \(\Box\).
5. Confirm that \(c\) and \(\hbar\) remain explicit unless natural units were explicitly requested and declared.
6. Include sufficient intermediate algebra for the reader to check the signs.
